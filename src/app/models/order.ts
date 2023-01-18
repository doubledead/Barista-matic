import { OrderItem } from "./orderItem"

export interface Order {
  id?: number,
  completed: boolean,
  total?: number,
  items?: OrderItem[]
}
