import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredients/ingredient.service';
import { Ingredient } from '../models/ingredient';
import { InventoryService } from '../services/inventory/inventory.service';
import { InventoryItem } from '../models/inventoryItem';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  ingredients: Ingredient[] = [];
  inventoryItems: InventoryItem[] = [];

  constructor(private ingredientService: IngredientService, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(data => {
      this.ingredients = data;
    });

    this.inventoryService.getInventoryItems().subscribe(data => {
      this.inventoryItems = data;
    });
  }

}
