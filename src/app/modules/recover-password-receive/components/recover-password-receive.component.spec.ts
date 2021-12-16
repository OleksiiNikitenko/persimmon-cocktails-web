import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswordReceiveComponent } from './recover-password-receive.component';

describe('RecoverPasswordReceieveComponent', () => {
  let component: RecoverPasswordReceiveComponent;
  let fixture: ComponentFixture<RecoverPasswordReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverPasswordReceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
