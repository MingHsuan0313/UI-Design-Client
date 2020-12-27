import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNameDialogComponent } from './project-name-dialog.component';

describe('ProjectNameDialogComponent', () => {
  let component: ProjectNameDialogComponent;
  let fixture: ComponentFixture<ProjectNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
