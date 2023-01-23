import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // #region // ------------ Properties ----------------- //

  it('has all of its properties which instantiate to default values', () => {
    expect(component.orderId).toBe(0);
    expect(component.orderTotal).toBe(0);
    expect(component.orderStep).toBe(1);
    expect(component.errorState).toBe(false);
    expect(component.viewJson).toBe(false);

    expect(component.ingredients).toHaveSize(0);
    expect(component.orders).toHaveSize(0);
    expect(component.orderItems).toHaveSize(0);
    expect(component.recipes).toHaveSize(0);

  });

  // #endregion
});
