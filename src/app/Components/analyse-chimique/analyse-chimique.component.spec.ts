import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseChimiqueComponent } from './analyse-chimique.component';

describe('AnalyseChimiqueComponent', () => {
  let component: AnalyseChimiqueComponent;
  let fixture: ComponentFixture<AnalyseChimiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyseChimiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalyseChimiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
