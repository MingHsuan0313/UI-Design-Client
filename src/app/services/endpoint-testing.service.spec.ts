import { TestBed } from '@angular/core/testing';

import { EndpointTestingService } from './endpoint-testing.service';

describe('EndpointTestingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndpointTestingService = TestBed.get(EndpointTestingService);
    expect(service).toBeTruthy();
  });
});
