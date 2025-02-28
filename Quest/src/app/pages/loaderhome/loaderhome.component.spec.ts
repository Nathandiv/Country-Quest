import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderhomeComponent } from './loaderhome.component';

describe('LoaderhomeComponent', () => {
  let component: LoaderhomeComponent;
  let fixture: ComponentFixture<LoaderhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaderhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
