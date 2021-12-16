import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsPopupComponent } from './errors-popup.component';

describe('ErrorsPopupComponent', () => {
  let component: ErrorsPopupComponent;
  let fixture: ComponentFixture<ErrorsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
