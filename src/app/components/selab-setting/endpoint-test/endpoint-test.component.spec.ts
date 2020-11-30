import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointTestComponent } from './endpoint-test.component';

describe('EndpointTestComponent', () => {
  let component: EndpointTestComponent;
  let fixture: ComponentFixture<EndpointTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
