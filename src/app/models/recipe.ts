import { Ingredient } from "./ingredient"

export interface Recipe {
  id: number,
  name: string,
  cost: number,
  ingredients: Ingredient[]
}
