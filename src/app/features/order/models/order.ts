export interface OrderItem {
  id?: number,
  name: string,
  cost: number,
  quantity: number
}

export interface Order {
  id?: number,
  completed: boolean,
  total?: number,
  items?: OrderItem[]
}
