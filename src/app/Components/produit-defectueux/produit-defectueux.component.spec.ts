import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitDefectueuxComponent } from './produit-defectueux.component';

describe('ProduitDefectueuxComponent', () => {
  let component: ProduitDefectueuxComponent;
  let fixture: ComponentFixture<ProduitDefectueuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitDefectueuxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitDefectueuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
