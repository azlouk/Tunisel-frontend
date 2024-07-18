import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLigneJournalierComponent } from './ajouter-ligne-journalier.component';

describe('AjouterLigneJournalierComponent', () => {
  let component: AjouterLigneJournalierComponent;
  let fixture: ComponentFixture<AjouterLigneJournalierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterLigneJournalierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterLigneJournalierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
