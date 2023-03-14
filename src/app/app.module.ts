import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { StoreModule } from '@ngrx/store';
import { ordersReducer } from './state/order.reducer';
import { listReducer } from './state/list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ orders: ordersReducer, list: listReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
