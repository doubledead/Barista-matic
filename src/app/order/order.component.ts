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
  recipes: Recipe[] = [];
  ingredients: Ingredient[] = [];
  orderItems: OrderItem[] = [];

  // Initialize blank order
  order: Order = {
    id: this.orderId,
    step: 0
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

  // #region // ------------ Methods ------------ //

  recipe(recipeId: number) {
    return this.recipes.find(recipe => recipeId === recipe.id);
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
            } else {
              console.log('Cannot create drink');
            }
          }
        }
      });
    });
  }

  addToOrder(drink: Recipe) {
    console.log('Recipe: ', this.recipe(drink.id));

    let drinkRecipe = this.recipe(drink.id);

    if (drinkRecipe && !drinkRecipe.outOfStock) {
      this.manageInventory(drink);

      this.orderTotal += drink.cost;

      let orderItem: OrderItem = {
        name: drink.name,
        cost: drink.cost,
        quantity: 1
      };

      this.orderItems.push(orderItem);
    }
  }

  startOrder() {
    if (this.order.step == 0) {
      // do some animation to show next section
      this.order.step = 1;
    }
  }

  dispenseDrink() {
    if (this.order.step == 1) {
      // animation
      this.order.step = 2
    }
  }

  completeOrder() {
    // Add order to database


    // Clear order and increment id
    this.orderId++;
    this.order.id =this.orderId;
    // Change Step back to beginning
    this.order.step = 0;
  }

  // #endregion

}
