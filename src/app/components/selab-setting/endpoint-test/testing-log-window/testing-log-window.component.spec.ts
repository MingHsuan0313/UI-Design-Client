import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingLogWindowComponent } from './testing-log-window.component';

describe('TestingLogWindowComponent', () => {
  let component: TestingLogWindowComponent;
  let fixture: ComponentFixture<TestingLogWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingLogWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingLogWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
