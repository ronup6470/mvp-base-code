import { TestBed } from '@angular/core/testing';

import { TagFamilyService } from './tag-family.service';

describe('TagFamilyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagFamilyService = TestBed.get(TagFamilyService);
    expect(service).toBeTruthy();
  });
});
