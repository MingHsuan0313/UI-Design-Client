import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JestTestingTerminalComponent } from './jest-testing-terminal.component';

describe('JestTestingTerminalComponent', () => {
  let component: JestTestingTerminalComponent;
  let fixture: ComponentFixture<JestTestingTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JestTestingTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JestTestingTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
