import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAddressComponent } from './single-address.component';

describe('SingleAddressComponent', () => {
  let component: SingleAddressComponent;
  let fixture: ComponentFixture<SingleAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
