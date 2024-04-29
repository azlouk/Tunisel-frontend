import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysePhysiqueComponent } from './analyse-physique.component';

describe('AnalysePhysiqueComponent', () => {
  let component: AnalysePhysiqueComponent;
  let fixture: ComponentFixture<AnalysePhysiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysePhysiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysePhysiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
