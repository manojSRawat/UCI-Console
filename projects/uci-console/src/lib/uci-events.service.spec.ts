import { TestBed } from '@angular/core/testing';

import { UciEventsService } from './uci-events.service';

describe('DiscussionEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UciEventsService = TestBed.get(UciEventsService);
    expect(service).toBeTruthy();
  });
});
