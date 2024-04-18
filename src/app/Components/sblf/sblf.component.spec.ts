import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SblfComponent } from './sblf.component';

describe('SblfComponent', () => {
  let component: SblfComponent;
  let fixture: ComponentFixture<SblfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SblfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SblfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
