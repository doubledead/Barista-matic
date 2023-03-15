import { createReducer, on } from '@ngrx/store';
import { OrderActions } from './order.actions';

export const initialState: ReadonlyArray<string> = [];

export const listReducer = createReducer(
  initialState,
  on(OrderActions.removeOrder, (state, {id }) =>
    state.filter((newId) => newId !== id)
  ),
  on(OrderActions.addOrder, (state, { id }) => {
    if (state.indexOf(id) > -1) return state;

    return [...state, id];
  })
);
