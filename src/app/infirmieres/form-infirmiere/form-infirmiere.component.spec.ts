import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormInfirmiereComponent} from './form-infirmiere.component';

describe('FormInfirmiereComponent', () => {
  let component: FormInfirmiereComponent;
  let fixture: ComponentFixture<FormInfirmiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormInfirmiereComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInfirmiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
