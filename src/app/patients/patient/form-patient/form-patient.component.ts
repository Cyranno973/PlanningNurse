import {Component, HostListener, OnInit} from '@angular/core';
import Patient from "../../../model/patient";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../repository/patient.service";

@Component({
  selector: 'app-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.scss']
})
export class FormPatientComponent implements OnInit {

  patient: Patient = this.config.data?.patient;
  form: FormGroup;

  constructor(public ref: DynamicDialogRef,
              private fb: FormBuilder,
              private ps: PatientService,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: [this.patient?.nom, [Validators.required]],
      prenom: [this.patient?.prenom, [Validators.required]],
      dateNaissance: [this.patient?.dateNaissance],
      email: [this.patient?.email],
      address: [this.patient?.address],
      telephone: this.fb.group({
        mobile: [this.patient?.telephone?.mobile],
        fixe: [this.patient?.telephone?.fixe],
        autre: [this.patient?.telephone?.autre]
      })
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (['Escape', 'Esc'].includes(event.code)) this.ref?.close()
  }

  save() {
    const newPatient = new Patient(this.form.value);
    let save: Promise<Patient>;
    if (this.patient) {
      save = this.ps.update(this.patient.id, newPatient);
    } else {
      save = this.ps.create(newPatient);
    }

    save
      .then(p => this.ref.close(p))
      .catch(() => this.ref.close())
  }
}
