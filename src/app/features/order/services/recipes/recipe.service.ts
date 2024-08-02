import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Recipe } from '../../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  url = 'http://localhost:3000';

  data = {
    "recipes": [
      {
        "id": 1,
        "cost": 2.75,
        "ingredients": [
          {
            "id": 1,
            "name": "Coffee",
            "stock": 3
          },
          {
            "id": 3,
            "name": "Sugar",
            "stock": 1
          },
          {
            "id": 4,
            "name": "Cream",
            "stock": 1
          }
        ],
        "name": "Coffee",
        "outOfStock": false
      },
      {
        "id": 2,
        "cost": 2.75,
        "ingredients": [
          {
            "id": 2,
            "name": "Decaf Coffee",
            "stock": 3
          },
          {
            "id": 3,
            "name": "Sugar",
            "stock": 1
          },
          {
            "id": 4,
            "name": "Cream",
            "stock": 1
          }
        ],
        "name": "Decaf Coffee",
        "outOfStock": false
      },
      {
        "id": 3,
        "cost": 2.55,
        "ingredients": [
          {
            "id": 7,
            "name": "Espresso",
            "stock": 2
          },
          {
            "id": 5,
            "name": "Steamed Milk",
            "stock": 1
          }
        ],
        "name": "Caffe Latte",
        "outOfStock": false
      },
      {
        "id": 4,
        "cost": 3.30,
        "ingredients": [
          {
            "id": 7,
            "name": "Espresso",
            "stock": 3
          }
        ],
        "name": "Caffe Americano",
        "outOfStock": false
      },
      {
        "id": 5,
        "cost": 3.35,
        "ingredients": [
          {
            "id": 7,
            "name": "Espresso",
            "stock": 1
          },
          {
            "id": 5,
            "name": "Steamed Milk",
            "stock": 1
          },
          {
            "id": 8,
            "name": "Cocoa",
            "stock": 1
          },
          {
            "id": 9,
            "name": "Whipped Cream",
            "stock": 1
          }
        ],
        "name": "Caffe Mocha",
        "outOfStock": false
      },
      {
        "id": 6,
        "cost": 2.90,
        "ingredients": [
          {
            "id": 7,
            "name": "Espresso",
            "stock": 2
          },
          {
            "id": 5,
            "name": "Steamed Milk",
            "stock": 1
          },
          {
            "id": 6,
            "name": "Foamed Milk",
            "stock": 1
          }
        ],
        "name": "Cappuccino",
        "outOfStock": false
      },
      {
        "id": 7,
        "cost": 4.75,
        "ingredients": [
          {
            "id": 7,
            "name": "Espresso",
            "stock": 4
          }
        ],
        "name": "Quad Shot",
        "outOfStock": false
      }
    ]
  }

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get<Recipe>(this.url + '/recipes');
  }

  getRecipesJSON(): Observable<any> {
    return of(this.data.recipes);
  }
}
