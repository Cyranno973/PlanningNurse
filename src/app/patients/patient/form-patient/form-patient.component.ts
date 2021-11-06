import {Component, HostListener, OnInit} from '@angular/core';
import {Patient} from "../../../model/patient";
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

  constructor(private fb: FormBuilder, private ps: PatientService,
              private config: DynamicDialogConfig, public ref: DynamicDialogRef) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: [this.patient?.nom, [Validators.required]],
      prenom: [this.patient?.prenom, [Validators.required]],
      dateNaissance: [this.patient?.dateNaissance],
      email: [this.patient?.email],
      address: [this.patient?.address],
      tel: this.fb.group({
        mobile: [this.patient?.tel?.mobile],
        fixe: [this.patient?.tel?.fixe],
        autre: [this.patient?.tel?.autre]
      })
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    this.ref?.close();
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
      .then(patient => this.ref.close(patient))
      .catch(() => this.ref.close())
  }
}
