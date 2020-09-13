import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceComponentConfigurationComponent } from './service-component-configuration.component';

describe('ServiceComponentConfigurationComponent', () => {
  let component: ServiceComponentConfigurationComponent;
  let fixture: ComponentFixture<ServiceComponentConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceComponentConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceComponentConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
