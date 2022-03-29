import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPasswortComponent } from './register-passwort.component';

describe('RegisterPasswortComponent', () => {
  let component: RegisterPasswortComponent;
  let fixture: ComponentFixture<RegisterPasswortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPasswortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPasswortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
