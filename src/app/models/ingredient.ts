export interface Ingredient {
  id: number,
  cost?: number,
  name: string,
  outOfStock?: boolean,
  restockFlag?: boolean,
  stock: number
}
