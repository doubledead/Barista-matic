import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<any> {
    return this.http.get<Ingredient>(this.url + '/ingredients');
  }
}
