import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './components/order/order.component';
import { StoreModule } from '@ngrx/store';
import { ordersReducer } from './state/order.reducer';
import { listReducer } from './state/list.reducer';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    DashboardComponent,
    MainComponent,
    AuthComponent
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
