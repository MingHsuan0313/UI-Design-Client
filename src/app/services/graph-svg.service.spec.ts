import { TestBed } from '@angular/core/testing';

import { GraphSVGService } from './graph-svg.service';

describe('GraphSVGService', () => {
  let service: GraphSVGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphSVGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
