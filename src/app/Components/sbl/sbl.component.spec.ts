import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SblComponent } from './sbl.component';

describe('SblComponent', () => {
  let component: SblComponent;
  let fixture: ComponentFixture<SblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SblComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
