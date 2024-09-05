import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcasseurComponent } from './concasseur.component';

describe('ConcasseurComponent', () => {
  let component: ConcasseurComponent;
  let fixture: ComponentFixture<ConcasseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcasseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConcasseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
