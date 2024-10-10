import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaverieComponent } from './laverie.component';

describe('LaverieComponent', () => {
  let component: LaverieComponent;
  let fixture: ComponentFixture<LaverieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaverieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaverieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
