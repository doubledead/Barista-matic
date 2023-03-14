import { createReducer, on } from '@ngrx/store';
import { OrderActions } from './order.actions';

export const initialState: ReadonlyArray<string> = [];

export const listReducer = createReducer(
  initialState,
  on(OrderActions.removeOrder, (state, {id }) =>
    state.filter((newId) => newId !== id)
  ),
  on(OrderActions.addOrder, (state, { bookId }) => {
    if (state.indexOf(bookId) > -1) return state;

    return [...state, bookId];
  })
);
