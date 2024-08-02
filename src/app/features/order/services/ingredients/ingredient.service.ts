import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ingredient } from '../../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  url = 'http://localhost:3000';

  data = {
    "ingredients": [
      {
        "id": 1,
        "cost": 0.75,
        "name": "Coffee",
        "outOfStock": false,
        "stock": 10
      },
      {
        "id": 2,
        "cost": 0.75,
        "name": "Decaf Coffee",
        "outOfStock": false,
        "stock": 10
      },
      {
        "id": 3,
        "cost": 0.25,
        "name": "Sugar",
        "outOfStock": false,
        "stock": 10
      },
      {
        "id": 4,
        "cost": 0.25,
        "name": "Cream",
        "outOfStock": false,
        "stock": 10
      },
      {
        "id": 5,
        "cost": 0.25,
        "name": "Steamed Milk",
        "outOfStock": false,
        "stock": 10
      },
      {
        "id": 6,
        "cost": 0.35,
        "name": "Foamed Milk",
        "outOfStock": false,
        "stock": 10
      },
      {
        "id": 7,
        "cost": 1.10,
        "name": "Espresso",
        "outOfStock": false,
        "stock": 10
      },
      {
        "id": 8,
        "cost": 0.90,
        "name": "Cocoa",
        "outOfStock": false,
        "stock": 10
      },
      {
        "id": 9,
        "cost": 1.00,
        "name": "Whipped Cream",
        "outOfStock": false,
        "stock": 10
      }
    ]
  }

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<any> {
    return this.http.get<Ingredient>(this.url + '/ingredients');
  }

  getIngredientsJSON(): Observable<any> {
    return of(this.data.ingredients);
  }
}
