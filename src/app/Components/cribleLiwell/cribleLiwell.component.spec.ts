import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CribleLiwellComponent } from './cribleLiwell.component';

describe('BandeComponent', () => {
  let component: CribleLiwellComponent;
  let fixture: ComponentFixture<CribleLiwellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CribleLiwellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CribleLiwellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
