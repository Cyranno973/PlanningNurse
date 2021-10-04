import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPatientComponent } from './form-patient.component';

describe('FormPatientComponent', () => {
  let component: FormPatientComponent;
  let fixture: ComponentFixture<FormPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
