import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGroupSettingDialogComponent } from './project-group-setting-dialog.component';

describe('ProjectGroupSettingDialogComponent', () => {
  let component: ProjectGroupSettingDialogComponent;
  let fixture: ComponentFixture<ProjectGroupSettingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGroupSettingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGroupSettingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
