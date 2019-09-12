import { TestBed } from '@angular/core/testing';

import { DataFilterPresenterService } from './data-filter-presenter.service';

describe('DataFilterPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataFilterPresenterService = TestBed.get(DataFilterPresenterService);
    expect(service).toBeTruthy();
  });
});
