import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendaddCardComponent } from './friendadd-card.component';

describe('FriendaddCardComponent', () => {
  let component: FriendaddCardComponent;
  let fixture: ComponentFixture<FriendaddCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendaddCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendaddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
