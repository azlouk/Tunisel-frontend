import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichevieComponent } from './fichevie.component';

describe('FichevieComponent', () => {
  let component: FichevieComponent;
  let fixture: ComponentFixture<FichevieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichevieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FichevieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
