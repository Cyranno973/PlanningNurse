import { TestBed } from '@angular/core/testing';

import { InfirmiereService } from './infirmiere.service';

describe('InfirmiereService', () => {
  let service: InfirmiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfirmiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
