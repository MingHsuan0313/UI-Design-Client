import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEditorComponent } from './nav-editor.component';

describe('NavEditorComponent', () => {
  let component: NavEditorComponent;
  let fixture: ComponentFixture<NavEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
