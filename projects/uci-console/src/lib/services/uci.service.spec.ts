import { TestBed } from '@angular/core/testing';

import { UciService } from './uci.service';

describe('UciService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UciService = TestBed.get(UciService);
    expect(service).toBeTruthy();
  });
});
