import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeTabsComponent } from './theme-tabs.component';

describe('ThemeTabsComponent', () => {
  let component: ThemeTabsComponent;
  let fixture: ComponentFixture<ThemeTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
