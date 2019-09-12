import { TestBed } from '@angular/core/testing';

import { CustomerFilterPresenterService } from './customer-filter.presenter';

describe('CustomerFilterPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerFilterPresenterService = TestBed.get(CustomerFilterPresenterService);
    expect(service).toBeTruthy();
  });
});
