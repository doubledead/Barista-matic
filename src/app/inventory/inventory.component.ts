import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredients/ingredient.service';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(data => {
      this.ingredients = data;
    });
  }

}
