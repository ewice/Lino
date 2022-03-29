import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnleitungComponent } from './anleitung.component';

describe('AnleitungComponent', () => {
  let component: AnleitungComponent;
  let fixture: ComponentFixture<AnleitungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnleitungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnleitungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
