import { TestBed } from '@angular/core/testing';

import { WashingServicesService } from './washing-services.service';

describe('WashingServicesService', () => {
  let service: WashingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WashingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
