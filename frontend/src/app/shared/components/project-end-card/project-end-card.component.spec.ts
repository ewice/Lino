import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEndCardComponent } from './project-end-card.component';

describe('ProjectEndCardComponent', () => {
  let component: ProjectEndCardComponent;
  let fixture: ComponentFixture<ProjectEndCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEndCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEndCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
