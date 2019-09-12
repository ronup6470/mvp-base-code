import { TestBed } from '@angular/core/testing';

import { SiteDataService } from './site-data.service';

describe('SiteDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteDataService = TestBed.get(SiteDataService);
    expect(service).toBeTruthy();
  });
});
