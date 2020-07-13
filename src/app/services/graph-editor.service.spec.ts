import { TestBed, inject } from '@angular/core/testing';

import { GraphEditorService } from './graph-editor.service';

describe('GraphEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphEditorService]
    });
  });

  it('should be created', inject([GraphEditorService], (service: GraphEditorService) => {
    expect(service).toBeTruthy();
  }));
});
