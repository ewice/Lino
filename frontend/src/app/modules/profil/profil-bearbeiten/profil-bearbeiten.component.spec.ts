import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilBearbeitenComponent } from './profil-bearbeiten.component';

describe('ProfilBearbeitenComponent', () => {
  let component: ProfilBearbeitenComponent;
  let fixture: ComponentFixture<ProfilBearbeitenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilBearbeitenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
