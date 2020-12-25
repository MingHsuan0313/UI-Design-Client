import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JestTestingLogWindowComponent } from './jest-testing-log-window.component';

describe('JestTestingLogWindowComponent', () => {
  let component: JestTestingLogWindowComponent;
  let fixture: ComponentFixture<JestTestingLogWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JestTestingLogWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JestTestingLogWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
