import { TestBed } from '@angular/core/testing';

import { GuidelinesService } from './guidelines.service';

describe('GuidelinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuidelinesService = TestBed.get(GuidelinesService);
    expect(service).toBeTruthy();
  });
});
