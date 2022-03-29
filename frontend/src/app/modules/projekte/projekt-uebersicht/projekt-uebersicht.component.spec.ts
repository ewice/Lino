import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektUebersichtComponent } from './projekt-uebersicht.component';

describe('ProjektUebersichtComponent', () => {
  let component: ProjektUebersichtComponent;
  let fixture: ComponentFixture<ProjektUebersichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektUebersichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
