import { TestBed } from '@angular/core/testing';

import { StyleEditorService } from './style-editor.service';

describe('StyleEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StyleEditorService = TestBed.get(StyleEditorService);
    expect(service).toBeTruthy();
  });
});
