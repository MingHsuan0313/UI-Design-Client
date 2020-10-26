import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineTabComponent } from './pipeline-tab.component';

describe('PipelineTabComponent', () => {
  let component: PipelineTabComponent;
  let fixture: ComponentFixture<PipelineTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
