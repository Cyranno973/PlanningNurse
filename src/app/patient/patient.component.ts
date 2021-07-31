import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectItem} from "primeng/api";
import {Soins} from "../enums/soins";
import {TypeSoins} from "../model/typeSoins";
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patientForm: FormGroup;
  errorMessage: string;
  typeSoins: TypeSoins[];
  selectedSoins: TypeSoins;
  soins = ['Ponctuel', 'Regulier'];

  // soinsEnum: SelectItem[] = Object.values(Soins).map(soin => ({labe: soin, value: soin}));
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.typeSoins = [
      {type: "continu"},
      {type: "ponctuel"}
    ];
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
