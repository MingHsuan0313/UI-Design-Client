import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryServiceWindowComponent } from './query-service-window.component';

describe('QueryServiceWindowComponent', () => {
  let component: QueryServiceWindowComponent;
  let fixture: ComponentFixture<QueryServiceWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryServiceWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryServiceWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
