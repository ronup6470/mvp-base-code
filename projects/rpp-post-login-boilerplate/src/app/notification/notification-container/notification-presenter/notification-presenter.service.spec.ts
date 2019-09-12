import { TestBed } from '@angular/core/testing';

import { NotificationPresenterServiceService } from './notification-presenter-service.service';

describe('NotificationPresenterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationPresenterServiceService = TestBed.get(NotificationPresenterServiceService);
    expect(service).toBeTruthy();
  });
});
