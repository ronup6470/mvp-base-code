import { TestBed } from '@angular/core/testing';

import { FunctionalDataService } from './functional-data.service';

describe('FunctionalDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunctionalDataService = TestBed.get(FunctionalDataService);
    expect(service).toBeTruthy();
  });
});
