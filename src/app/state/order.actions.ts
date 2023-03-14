import { createActionGroup, props } from '@ngrx/store';
import { Order } from '../models/order';

export const OrderActions = createActionGroup({
  source: 'Orders',
  events: {
    'Add Order': props<{ id: string }>(),
    'Remove Order': props<{ id: string }>(),
  },
});

export const OrderApiActions = createActionGroup({
  source: 'Order API',
  events: {
    'Retrieved Order List': props<{ orders: ReadonlyArray<Order> }>(),
  },
});
