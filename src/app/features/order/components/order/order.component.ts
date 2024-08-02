import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredients/ingredient.service';
import { RecipeService } from '../../services/recipes/recipe.service';
import { Ingredient, Recipe } from '../../models/recipe';
import { Order, OrderItem } from '../../models/order';
import { CommonModule, formatCurrency } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  // #region // ---------- Properties ---------- //

  orderId: number = 0;
  orderTotal: number = 0;
  orderTotalFormatted: string = '';
  // 0 - Error, 1 - Start, 2 - Order, 3 - Processing,
  // 4 - Complete, 5 - Canceled
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

  viewJson: boolean = false;

  // #endregion

  // #region // ---------- LIFECYCLE ---------- //

  constructor(private recipetService: RecipeService, private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe({
      next: data => {
        console.log('Ingredients:', data)
        this.ingredients = data;
      },
      error: err => console.error('Error notification ingredientService: ' + err),
      complete: () => console.log('Complete notification ingredientService')
    });

    this.recipetService.getRecipes().subscribe({
      next: data => {
        console.log('Recipes:', data)
        this.recipes = data;
      },
      error: err => console.error('Error notification recipetService: ' + err),
      complete: () => console.log('Complete notification recipetService')
    });
  }

  // #endregion

  // #region // ------------ Methods - Ingredients ------------ //

  private restockIngrientsFull() {
    this.ingredients.forEach(ingredient => {
      ingredient.stock = 10;
      ingredient.outOfStock = false;
    });
  }

  private udpateIngredientStock(id: number, newStockLevel: number) {
    this.ingredients.forEach(ingredient => {
      if (id === ingredient.id) {
        ingredient.stock = newStockLevel;
        if (newStockLevel == 0) ingredient.outOfStock = true;
      }
    });
  }

  private getIngredientStock(recipeIngredients: Ingredient[]) {
    const ingredientStock: Ingredient[] = [];
    recipeIngredients.forEach(recipeIngredient => {
      this.ingredients.forEach(ingredient => {
        if (ingredient.id == recipeIngredient.id) ingredientStock.push(ingredient);
      });
    });

    return ingredientStock;
  }

  restockMachine() {
    this.restockIngrientsFull();
    this.restockRecipesFull();
  }

  // #endregion

  // #region // ------------ Methods - Recipe ------------ //

  private getRecipe(recipeId: number) {
    return this.recipes.find(recipe => recipeId === recipe.id);
  }

  private restockRecipesFull() {
    this.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => { ingredient.outOfStock = false; });
      recipe.outOfStock = false;
    });
  }

  private updateRecipeStatus() {
    this.recipes.forEach(recipe => {
      this.ingredients.forEach(ingredient => {
        recipe.ingredients.forEach(recipeIngredient => {
          if (recipeIngredient.id == ingredient.id) {
            const newStockLevel: number = ingredient.stock - recipeIngredient.stock;
            if (newStockLevel < 0) recipe.outOfStock = true;
          }
        });
      });
    });
  }

  // #endregion

  // #region // ------------ Methods - Order ------------ //

  updateInventory(recipeOrder: Recipe) {
    // Check Recipe Stock levels
    const recipeIngredients: Ingredient[] = recipeOrder.ingredients;
    // Get latest Ingredient stock levels for just recipeOrder ingredients
    const ingredientStock: Ingredient[] = this.getIngredientStock(recipeIngredients);

    // Update Ingredient stock levels for just recipeOrder ingredients
    ingredientStock.forEach(ingredient => {
      recipeIngredients.forEach(recipeIngredient => {
        if (recipeIngredient.id == ingredient.id) {
          const newStockLevel: number = ingredient.stock - recipeIngredient.stock;
          if (newStockLevel >= 0) {
            this.udpateIngredientStock(ingredient.id, newStockLevel);
          } else {
            if (newStockLevel < 0) {
              console.log('Something went wrong! Ingredient ID: ', ingredient.id);
            }
          }
        }
      });
    });
  }

  addOrder(recipeOrder: Recipe) {
    this.orderTotal += recipeOrder.cost;
    this.orderTotalFormatted = formatCurrency(this.orderTotal, 'en-US', '$')

    let orderItem: OrderItem = {
      name: recipeOrder.name,
      cost: recipeOrder.cost,
      quantity: 1
    };

    this.orderItems.push(orderItem);
  }

  addToOrder(recipeId: number) {
    const recipeOrder = this.getRecipe(recipeId);

    if (recipeOrder && !recipeOrder.outOfStock) {
      this.updateInventory(recipeOrder);
      this.updateRecipeStatus();
      this.addOrder(recipeOrder);
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

    // TODO: add Order service and send to database
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

  cancelOrder() {
    this.orderStep = 5

    this.resetState();
    this.restockMachine();

    setTimeout(
      () => this.orderStep = 1,
      2000
    );
  }

  // #endregion

}
