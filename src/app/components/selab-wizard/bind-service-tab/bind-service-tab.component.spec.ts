import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindServiceTabComponent } from './bind-service-tab.component';

describe('BindServiceTabComponent', () => {
  let component: BindServiceTabComponent;
  let fixture: ComponentFixture<BindServiceTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindServiceTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindServiceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
