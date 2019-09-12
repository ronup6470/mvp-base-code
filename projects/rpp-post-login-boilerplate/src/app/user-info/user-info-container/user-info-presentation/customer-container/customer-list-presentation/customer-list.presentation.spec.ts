import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPresentationComponent } from './customer-presentation.component';

describe('CustomerPresentationComponent', () => {
  let component: CustomerPresentationComponent;
  let fixture: ComponentFixture<CustomerPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
