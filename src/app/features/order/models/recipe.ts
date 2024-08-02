export interface Ingredient {
  id: number,
  code: string,
  cost?: number,
  name: string,
  outOfStock?: boolean,
  stock: number
}

export interface Recipe {
  id: number,
  cost: number,
  ingredients: Ingredient[],
  name: string,
  outOfStock?: boolean
}
