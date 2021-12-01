import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRdvsComponent } from './patient-rdvs.component';

describe('PatientRdvsComponent', () => {
  let component: PatientRdvsComponent;
  let fixture: ComponentFixture<PatientRdvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRdvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRdvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
