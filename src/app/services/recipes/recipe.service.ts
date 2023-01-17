import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get<Recipe>(this.url + '/recipes');
  }
}
