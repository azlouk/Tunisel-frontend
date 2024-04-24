import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutFichevieInterventionComponent } from './ajout-fichevie-intervention.component';

describe('AjoutFichevieInterventionComponent', () => {
  let component: AjoutFichevieInterventionComponent;
  let fixture: ComponentFixture<AjoutFichevieInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutFichevieInterventionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutFichevieInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
