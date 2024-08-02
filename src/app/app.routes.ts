import { Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { OrderComponent } from './features/order/components/order/order.component';

// TODO: add route guards to auth

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'order',
    component: OrderComponent
  }
];

