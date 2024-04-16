import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuitComponent } from './puit.component';

describe('PuitComponent', () => {
  let component: PuitComponent;
  let fixture: ComponentFixture<PuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
