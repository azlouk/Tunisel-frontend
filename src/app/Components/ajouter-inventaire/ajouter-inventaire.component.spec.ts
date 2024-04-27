import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterInventaireComponent } from './ajouter-inventaire.component';

describe('AjouterInventaireComponent', () => {
  let component: AjouterInventaireComponent;
  let fixture: ComponentFixture<AjouterInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterInventaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
