import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPrelevmentPhysiqueComponent } from './ajouter-prelevment-physique.component';

describe('AjouterPrelevmentPhysiqueComponent', () => {
  let component: AjouterPrelevmentPhysiqueComponent;
  let fixture: ComponentFixture<AjouterPrelevmentPhysiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterPrelevmentPhysiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterPrelevmentPhysiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
