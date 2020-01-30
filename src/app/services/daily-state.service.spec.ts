import { TestBed } from '@angular/core/testing';

import { DailyStateService } from './daily-state.service';

describe('DailyStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyStateService = TestBed.get(DailyStateService);
    expect(service).toBeTruthy();
  });
});
