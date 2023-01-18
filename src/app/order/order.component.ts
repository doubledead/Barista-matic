import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipes/recipe.service';
import { Recipe } from '../models/recipe';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderItem';
import { InventoryService } from '../services/inventory/inventory.service';
import { InventoryItem } from '../models/inventoryItem';
import { Ingredient } from '../models/ingredient';

// export interface Order {
//   id?: number,
//   total?: number,
//   items: OrderItem[]
// }
// export class NewOrder implements Order {
//   id?: number;
//   total?: number;
//   items: OrderItem[]
// }

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  // #region // ---------- Properties ---------- //
  orderTotal: number = 0;
  recipes: Recipe[] = [];
  inventoryItems: InventoryItem[] = [];
  orderItems: OrderItem[] = [];
  orders: Order[] = [];
  // order = <Order>{};
  // myOrder = new NewOrder();

  // #endregion

  // #region // ---------- LIFECYCLE ---------- //

  constructor(private recipetService: RecipeService, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.recipetService.getRecipes().subscribe(data => {
      this.recipes = data;
    });

    this.inventoryService.getInventoryItems().subscribe(data => {
      this.inventoryItems = data;
    });
  }

  // #endregion

  // #region // ------------ Methods ------------ //

  getInventoryItem(ingredient: Ingredient) {
    let invItem: InventoryItem = {
      name: '',
      quantity: 0
    };
    this.inventoryItems.forEach(item => {
      if (item.name == ingredient.name) {
        invItem = item;
      }
    });

    return invItem;
  }


  manageInventory(drink: Recipe) {
    drink.ingredients.forEach(ingredient => {
      console.log('Ingredient: ', ingredient);
      // console.log('InventoryItem: ', this.getInventoryItem(ingredient));
      this.inventoryItems.forEach(item => {
        if (item.name == ingredient.name) {
          if (ingredient.quantity) item.quantity - ingredient.quantity;
        }
      });
    });

    console.log('inventoryItems: ', this.inventoryItems);

  }

  addToOrder(drink: Recipe) {
    this.manageInventory(drink);

    this.orderTotal += drink.cost;

    let orderItem: OrderItem = {
      name: drink.name,
      cost: drink.cost,
      quantity: 1
    };

    this.orderItems.push(orderItem);

    // this.myOrder.items.push(orderItem);
  }

  submitOrder() {}

  // #endregion

}
