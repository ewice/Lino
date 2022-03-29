import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectrequestCardComponent } from './projectrequest-card.component';

describe('ProjectrequestCardComponent', () => {
  let component: ProjectrequestCardComponent;
  let fixture: ComponentFixture<ProjectrequestCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectrequestCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectrequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
