import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProfilbildComponent } from './register-profilbild.component';

describe('RegisterProfilbildComponent', () => {
  let component: RegisterProfilbildComponent;
  let fixture: ComponentFixture<RegisterProfilbildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterProfilbildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProfilbildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
