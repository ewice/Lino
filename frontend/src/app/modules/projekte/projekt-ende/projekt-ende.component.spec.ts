import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektEndeComponent } from './projekt-ende.component';

describe('ProjektEndeComponent', () => {
  let component: ProjektEndeComponent;
  let fixture: ComponentFixture<ProjektEndeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektEndeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektEndeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
