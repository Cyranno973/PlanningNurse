import { TestBed } from '@angular/core/testing';

import { RdvsService } from './rdvs.service';

describe('RdvsService', () => {
  let service: RdvsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdvsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
