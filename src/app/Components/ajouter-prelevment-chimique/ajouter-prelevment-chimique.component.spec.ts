import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPrelevmentChimiqueComponent } from './ajouter-prelevment-chimique.component';

describe('AjouterPrelevmentChimiqueComponent', () => {
  let component: AjouterPrelevmentChimiqueComponent;
  let fixture: ComponentFixture<AjouterPrelevmentChimiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterPrelevmentChimiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterPrelevmentChimiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
