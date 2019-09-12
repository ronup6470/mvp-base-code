import { TestBed } from '@angular/core/testing';

import { ChannelNotificationService } from './channel-notification.service';

describe('ChannelNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelNotificationService = TestBed.get(ChannelNotificationService);
    expect(service).toBeTruthy();
  });
});
