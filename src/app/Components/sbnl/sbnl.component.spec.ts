import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbnlComponent } from './sbnl.component';

describe('SbnlComponent', () => {
  let component: SbnlComponent;
  let fixture: ComponentFixture<SbnlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbnlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SbnlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
