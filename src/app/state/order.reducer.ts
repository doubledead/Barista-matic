import { createReducer, on } from '@ngrx/store';

import { OrderApiActions } from './order.actions';
import { Order } from '../models/order';

export const initialState: ReadonlyArray<Order> = [];

export const ordersReducer = createReducer(
  initialState,
  on(OrderApiActions.retrievedOrderList, (_state, { orders }) => orders)
);
