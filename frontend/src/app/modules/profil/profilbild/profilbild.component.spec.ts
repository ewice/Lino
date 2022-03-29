import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilbildComponent } from './profilbild.component';

describe('ProfilbildComponent', () => {
  let component: ProfilbildComponent;
  let fixture: ComponentFixture<ProfilbildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilbildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilbildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
