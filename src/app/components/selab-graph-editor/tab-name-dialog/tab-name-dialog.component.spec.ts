import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNameDialogComponent } from './tab-name-dialog.component';

describe('TabNameDialogComponent', () => {
  let component: TabNameDialogComponent;
  let fixture: ComponentFixture<TabNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabNameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
