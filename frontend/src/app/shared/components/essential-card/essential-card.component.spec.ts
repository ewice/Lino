import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialCardComponent } from './essential-card.component';

describe('EssentialCardComponent', () => {
  let component: EssentialCardComponent;
  let fixture: ComponentFixture<EssentialCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssentialCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssentialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
