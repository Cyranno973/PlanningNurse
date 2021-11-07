import {Component, HostListener, OnInit} from '@angular/core';
import {Patient} from "../../../model/patient";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../repository/patient.service";
import {Soignant} from "../../../model/soignant";
import {take} from "rxjs/operators";
import {SoignantService} from "../../../repository/soignant.service";

@Component({
  selector: 'app-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.scss']
})
export class FormPatientComponent implements OnInit {

  patient: Patient = this.config.data?.patient;
  form: FormGroup;
  soignants: Soignant[];

  constructor(private fb: FormBuilder, private ps: PatientService, private ss: SoignantService,
              private config: DynamicDialogConfig, public ref: DynamicDialogRef) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: [this.patient?.nom, [Validators.required]],
      prenom: [this.patient?.prenom, [Validators.required]],
      dateNaissance: [this.patient?.dateNaissance],
      email: [this.patient?.email],
      address: [this.patient?.address],
      soignant: [this.patient?.soignant],
      tel: this.fb.group({
        mobile: [this.patient?.tel?.mobile],
        fixe: [this.patient?.tel?.fixe],
        autre: [this.patient?.tel?.autre]
      })
    });

    // Récupère les soignants
    this.ss.getAll().pipe(take(1))
      .subscribe(
        soignants => this.soignants = soignants,
        err => console.log(`Erreur pendant la récupération des soignants`, err));
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
