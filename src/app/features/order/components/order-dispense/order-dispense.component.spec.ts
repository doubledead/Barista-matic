import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDispenseComponent } from './order-dispense.component';

describe('OrderDispenseComponent', () => {
  let component: OrderDispenseComponent;
  let fixture: ComponentFixture<OrderDispenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDispenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
