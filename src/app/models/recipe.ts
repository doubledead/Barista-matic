import { Ingredient } from "./ingredient"

export interface Recipe {
  id: number,
  cost: number,
  ingredients: Ingredient[],
  name: string,
  outOfStock?: boolean
}
