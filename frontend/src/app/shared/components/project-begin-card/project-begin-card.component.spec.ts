import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBeginCardComponent } from './project-begin-card.component';

describe('ProjectBeginCardComponent', () => {
  let component: ProjectBeginCardComponent;
  let fixture: ComponentFixture<ProjectBeginCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBeginCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBeginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
