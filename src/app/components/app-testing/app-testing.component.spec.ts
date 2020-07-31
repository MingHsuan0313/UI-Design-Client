import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTestingComponent } from './app-testing.component';

describe('AppTestingComponent', () => {
  let component: AppTestingComponent;
  let fixture: ComponentFixture<AppTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
