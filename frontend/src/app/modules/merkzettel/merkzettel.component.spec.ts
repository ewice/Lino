import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkzettelComponent } from './merkzettel.component';

describe('MerkzettelComponent', () => {
  let component: MerkzettelComponent;
  let fixture: ComponentFixture<MerkzettelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerkzettelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerkzettelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
