import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipes/recipe.service';
import { Recipe } from '../models/recipe';
// import { Order } from '../models/order';
import { OrderItem } from '../models/orderItem';

// class Order {
//   id?: number;
//   total?: number;
//   items?: OrderItem[]
// }

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  recipes: Recipe[] = [];
  orderTotal: number = 0;
  // order = <Order>{};
  // orders: Order[];
  // order: Order{} = {};
  orderItems: OrderItem[] = [];

  constructor(private recipetService: RecipeService) { }

  ngOnInit(): void {
    this.recipetService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  addToOrder(drink: Recipe) {
    this.orderTotal = this.orderTotal + drink.cost;

    let orderItem = {
      name: drink.name,
      cost: drink.cost,
      quantity: 1
    };

    this.orderItems.push(orderItem);
  }

}
