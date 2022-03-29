import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DificultyBadgeComponent } from './difficulty-badge.component';

describe('DificultyBadgeComponent', () => {
  let component: DificultyBadgeComponent;
  let fixture: ComponentFixture<DificultyBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DificultyBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DificultyBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
