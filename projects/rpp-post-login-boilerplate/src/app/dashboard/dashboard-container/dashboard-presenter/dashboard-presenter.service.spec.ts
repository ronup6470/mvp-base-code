import { TestBed } from '@angular/core/testing';

import { DashboardPresenterService } from './dashboard-presenter.service';

describe('DashboardPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardPresenterService = TestBed.get(DashboardPresenterService);
    expect(service).toBeTruthy();
  });
});
