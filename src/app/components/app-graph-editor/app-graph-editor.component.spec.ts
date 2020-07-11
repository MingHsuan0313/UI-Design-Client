import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGraphEditorComponent } from './app-graph-editor.component';

describe('AppGraphEditorComponent', () => {
  let component: AppGraphEditorComponent;
  let fixture: ComponentFixture<AppGraphEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppGraphEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGraphEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
