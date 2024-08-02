export interface Ingredient {
  id: number,
  code: string,
  cost?: number,
  name: string,
  outOfStock?: boolean,
  stock: number
}
