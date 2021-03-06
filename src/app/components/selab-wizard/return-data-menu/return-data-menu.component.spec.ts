import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDataMenuComponent } from './return-data-menu.component';

describe('ReturnDataMenuComponent', () => {
  let component: ReturnDataMenuComponent;
  let fixture: ComponentFixture<ReturnDataMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnDataMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDataMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
