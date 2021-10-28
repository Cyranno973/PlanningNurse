import { TestBed } from '@angular/core/testing';

import { PatientRdvsService } from './patient-rdvs.service';

describe('PatientRdvsService', () => {
  let service: PatientRdvsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientRdvsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
