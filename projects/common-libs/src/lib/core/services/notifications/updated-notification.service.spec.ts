import { TestBed } from '@angular/core/testing';

import { UpdatedNotificationService } from './updated-notification.service';

describe('UpdatedNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatedNotificationService = TestBed.get(UpdatedNotificationService);
    expect(service).toBeTruthy();
  });
});
