import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelabBodyComponent } from './selab-body.component';

describe('SelabBodyComponent', () => {
  let component: SelabBodyComponent;
  let fixture: ComponentFixture<SelabBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelabBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelabBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
