import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import * as recipeData from '../../../../api/recipes.json'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  url = 'http://localhost:3000';
  jsonData = recipeData;

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get<Recipe>(this.url + '/recipes');
  }

  getIngredientsJSON(): Observable<any> {
    return of(this.jsonData.recipes);
  }
}
