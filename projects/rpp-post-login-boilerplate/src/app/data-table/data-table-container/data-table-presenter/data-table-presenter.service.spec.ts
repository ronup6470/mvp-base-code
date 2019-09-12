import { TestBed } from '@angular/core/testing';

import { DataTablePresenterService } from './data-table-presenter.service';

describe('DataTablePresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTablePresenterService = TestBed.get(DataTablePresenterService);
    expect(service).toBeTruthy();
  });
});
