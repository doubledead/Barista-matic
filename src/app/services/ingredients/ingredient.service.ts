import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ingredient } from '../../models/ingredient';
import * as ingredientData from '../../../../api/ingredients.json'

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  url = 'http://localhost:3000';
  jsonData = ingredientData;

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<any> {
    return this.http.get<Ingredient>(this.url + '/ingredients');
  }

  getIngredientsJSON(): Observable<any> {
    return of(this.jsonData.ingredients);
  }
}
