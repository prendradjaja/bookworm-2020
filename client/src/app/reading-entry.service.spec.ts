import { TestBed } from '@angular/core/testing';

import { ReadingEntryService } from './reading-entry.service';

describe('ReadingEntryService', () => {
  let service: ReadingEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
