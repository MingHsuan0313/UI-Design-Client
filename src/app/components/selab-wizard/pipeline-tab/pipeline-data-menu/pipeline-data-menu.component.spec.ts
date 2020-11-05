import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineDataMenuComponent } from './pipeline-data-menu.component';

describe('PipelineDataMenuComponent', () => {
  let component: PipelineDataMenuComponent;
  let fixture: ComponentFixture<PipelineDataMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineDataMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineDataMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
