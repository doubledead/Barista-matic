import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredients/ingredient.service';
import { Ingredient } from '../models/ingredient';
import { RecipeService } from '../services/recipes/recipe.service';
import { Recipe } from '../models/recipe';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderItem';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  // #region // ---------- Properties ---------- //

  orderId: number = 0;
  orderTotal: number = 0;
  orderStep: number = 1;
  errorState: boolean = false;

  ingredients: Ingredient[] = [];
  orders: Order[] = [];
  orderItems: OrderItem[] = [];
  recipes: Recipe[] = [];

  // Initialize blank order
  order: Order = {
    id: this.orderId,
    completed: false
  }

  // #endregion

  // #region // ---------- LIFECYCLE ---------- //

  constructor(private recipetService: RecipeService, private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(data => {
      this.ingredients = data;
    });

    this.recipetService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  // #endregion

  // #region // ------------ Methods - Order ------------ //

  recipe(recipeId: number) {
    return this.recipes.find(recipe => recipeId === recipe.id);
  }

  ingredient(ingredientId: number) {
    return this.ingredients.find(ingredient => ingredientId === ingredient.id);
  }

  restockIngrient(ingredientId: number) {
    this.ingredients.forEach(ingredient => {
      if (ingredientId === ingredient.id) {
        ingredient.stock = 10;
        ingredient.outOfStock = false;
        ingredient.restockFlag = false;
        this.restockRecipe(ingredient.id);
      }
    });
  }

  restockRecipe(ingredientId: number) {
    this.recipes.forEach(recipe => {
      recipe.ingredients.forEach(element => {
        if (element.id == ingredientId) element.outOfStock = false;
      });

      if (recipe.ingredients.every(ingredient => !ingredient.outOfStock)) recipe.outOfStock = false;
    });

  }

  manageInventory(drink: Recipe) {
    drink.ingredients.forEach(drinkIngredient => {
      this.ingredients.forEach(ingredient => {
        if (ingredient.name == drinkIngredient.name) {
          if (!ingredient.outOfStock) {
            let tempStockLevel: number = ingredient.stock - drinkIngredient.stock;
            if (tempStockLevel >= 0) {
              ingredient.stock = ingredient.stock - drinkIngredient.stock;
              if (ingredient.stock == 0) {
                ingredient.outOfStock = true;
                this.recipes.forEach(recipe => {
                  if (drink.id == recipe.id) recipe.outOfStock = true;
                });
              }
            } else if (tempStockLevel < 0) {
              ingredient.restockFlag = true;
              this.recipes.forEach(recipe => {
                if (drink.id == recipe.id) recipe.outOfStock = true;
                recipe.ingredients.forEach(recipeIngredient => {
                  if (ingredient.id == recipeIngredient.id) recipeIngredient.outOfStock = true;
                });
              });
              console.log('Cannot create drink');
            }
            else {
              console.log('End');
            }
          }
        }
      });
    });
  }

  addToOrder(drink: Recipe) {
    let drinkRecipe = this.recipe(drink.id);

    if (drinkRecipe && !drinkRecipe.outOfStock) {
      this.manageInventory(drink);

      let drinkRecipe2ndCheck = this.recipe(drink.id);

      if (drinkRecipe2ndCheck && !drinkRecipe2ndCheck.outOfStock) {
        this.orderTotal += drink.cost;

        let orderItem: OrderItem = {
          name: drink.name,
          cost: drink.cost,
          quantity: 1
        };

        this.orderItems.push(orderItem);
      }

    }
  }

  // #endregion

  // #region // ------------ Methods - State Management ------------ //

  resetState() {
    this.orderItems = [];
    this.orderTotal = 0;
    this.orderId++;
    this.order.id = this.orderId;
    this.order.completed = false;
    this.order.items = [];
  }

  startOrder() {
    if (this.orderStep == 1) {
      // TODO: Animation
      this.orderStep = 2;
    }
  }

  dispenseDrink() {
    if ((this.orderItems.length > 0) && (this.orderStep == 2)) {
      // TODO: animation
      this.submitOrder()
    }
  }

  submitOrder() {
    this.orderStep = 3;

    let order: Order = {
      id: this.order.id,
      completed: true,
      items: this.orderItems,
      total: this.orderTotal,
    };


    // TODO: Add order to database
    // TODO: Wait for database response and set state accordingly
    this.orders.push(order);

    setTimeout(
      () => this.completeOrder(),
      2000
    );

  }

  completeOrder() {
    this.orderStep = 4

    this.resetState();

    setTimeout(
      () => this.orderStep = 1,
      2000
    );
  }

  // #endregion

}
