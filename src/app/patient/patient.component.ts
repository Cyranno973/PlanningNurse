import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Soins} from "../enums/soins";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patientForm: FormGroup;
  errorMessage: string;
  soins: Soins;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initPatientFOrm();
  }

  initPatientFOrm() {
    this.patientForm = this.formBuilder.group(
      {
        prenom: ['', [Validators.required]],
        nom: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        tel: ['', [Validators.required]],
        personContact: ['', [Validators.required]],
        commentaire: ['']
      }
    )
  }

  onSubmitPatientForm() {

  }

}
