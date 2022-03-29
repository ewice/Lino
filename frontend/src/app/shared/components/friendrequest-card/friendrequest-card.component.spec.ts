import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendrequestCardComponent } from './friendrequest-card.component';

describe('FriendrequestCardComponent', () => {
  let component: FriendrequestCardComponent;
  let fixture: ComponentFixture<FriendrequestCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendrequestCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendrequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
