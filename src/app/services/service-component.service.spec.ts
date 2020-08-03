import { TestBed } from '@angular/core/testing';

import { ServiceComponentService } from './service-component.service';

describe('ServiceComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceComponentService = TestBed.get(ServiceComponentService);
    expect(service).toBeTruthy();
  });
});
