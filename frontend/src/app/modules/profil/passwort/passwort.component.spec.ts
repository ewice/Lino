import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswortComponent } from './passwort.component';

describe('PasswortComponent', () => {
  let component: PasswortComponent;
  let fixture: ComponentFixture<PasswortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
