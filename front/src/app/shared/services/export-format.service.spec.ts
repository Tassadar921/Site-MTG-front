import { TestBed } from '@angular/core/testing';

import { ExportFormatService } from './export-format.service';

describe('ExportFormatService', () => {
  let service: ExportFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
