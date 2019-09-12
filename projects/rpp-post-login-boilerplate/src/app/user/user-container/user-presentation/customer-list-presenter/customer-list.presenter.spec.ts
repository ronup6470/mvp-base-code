import { TestBed } from '@angular/core/testing';

import { CustomerPresenterService } from './customer-presenter.service';

describe('CustomerPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerPresenterService = TestBed.get(CustomerPresenterService);
    expect(service).toBeTruthy();
  });
});
