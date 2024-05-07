import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportAnalyseComponent } from './rapportAnalyse.component';

describe('AnalyseComponent', () => {
  let component: RapportAnalyseComponent;
  let fixture: ComponentFixture<RapportAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportAnalyseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
