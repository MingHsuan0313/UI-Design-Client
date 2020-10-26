import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeTabComponent } from './compose-tab.component';

describe('ComposeTabComponent', () => {
  let component: ComposeTabComponent;
  let fixture: ComponentFixture<ComposeTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
