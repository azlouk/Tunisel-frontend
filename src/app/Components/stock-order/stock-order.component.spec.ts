import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOrderComponent } from './stock-order.component';

describe('StockOrderComponent', () => {
  let component: StockOrderComponent;
  let fixture: ComponentFixture<StockOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
