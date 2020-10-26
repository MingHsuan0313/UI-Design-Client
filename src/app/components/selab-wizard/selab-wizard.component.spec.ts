import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelabWizardComponent } from './selab-wizard.component';

describe('SelabWizardComponent', () => {
  let component: SelabWizardComponent;
  let fixture: ComponentFixture<SelabWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelabWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelabWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
