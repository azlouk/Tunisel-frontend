import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CribleComponent } from './crible.component';

describe('CalibrationComponent', () => {
  let component: CribleComponent;
  let fixture: ComponentFixture<CribleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CribleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CribleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
