import { TestBed } from '@angular/core/testing';

import { UciUtilsService } from './uci-utils.service';

describe('DiscussUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UciUtilsService = TestBed.get(UciUtilsService);
    expect(service).toBeTruthy();
  });
});
