import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFilterPresentationComponent } from './customer-filter.presentation';

describe('CustomerFilterComponent', () => {
  let component: CustomerFilterPresentationComponent;
  let fixture: ComponentFixture<CustomerFilterPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFilterPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFilterPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
