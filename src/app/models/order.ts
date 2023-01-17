import { OrderItem } from "./orderItem"

export interface Order {
  id?: number,
  total?: number,
  items?: OrderItem[]
}
