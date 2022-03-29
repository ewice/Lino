import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressumUndDatenschutzComponent } from './impressum-und-datenschutz.component';

describe('ImpressumUndDatenschutzComponent', () => {
  let component: ImpressumUndDatenschutzComponent;
  let fixture: ComponentFixture<ImpressumUndDatenschutzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpressumUndDatenschutzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressumUndDatenschutzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
