import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {City, TypeSoin} from "../model/typeSoin";
import {PatientService} from "./patient.service";
import {Patient} from "../model/patient";


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patientForm: FormGroup;
  errorMessage: string;
  value: Date;
  typeSoins: TypeSoin[];
  cities: City[];
  date7: Date;
  selectedSoins: string;
  selectedCityCode: string;
  infotest: any
  patientSAve: Patient;

  // soinsEnum: SelectItem[] = Object.values(Soins).map(soin => ({labe: soin, value: soin}));
  constructor(private formBuilder: FormBuilder, private patientService: PatientService) {

    this.typeSoins = [
      {type: "continu"},
      {type: "ponctuel"}
    ];

    this.cities = [
      {name: 'New York'},
      {name: 'Rome'},
      {name: 'London'},
      {name: 'Istanbul'},
      {name: 'Paris'}
    ];
  }

  ngOnInit(): void {

    this.patientSAve = {
      prenom: "sarah"
    }
    this.patientService.create(this.patientSAve);
    this.initPatientFOrm();
  }

  initPatientFOrm() {
    this.patientForm = this.formBuilder.group(
      {
        prenom: ['', [Validators.required]],
        nom: ['', [Validators.required]],
        // email: ['', [Validators.required, Validators.email]],
        email: [''],
        address: [''],
        tel: [''],
        personContact: [''],
        commentaire: ['']
      }
    )
  }

  onSubmitPatientForm() {
    const prenom = this.patientForm.get('prenom').value;
    const nom = this.patientForm.get('nom').value;
    const email = this.patientForm.get('email').value;
    const address = this.patientForm.get('address').value;
    const tel = this.patientForm.get('tel').value;
    const personContact = this.patientForm.get('personContact').value;
    const commentaire = this.patientForm.get('commentaire').value;
    // console.log('prenom', prenom);
    // console.log('nom', nom);
    // console.log('email', email);
    // console.log('address', address);
    // console.log('tel', tel);
    // console.log('personContact', personContact);
    // console.log('commentaire', commentaire);

  }

  onchangeTypeSoin($event) {
    // console.log('yoyoyoy', $event);
    console.log($event)
    console.log($event.value);
  }

  onChange() {
    console.log('lalal');

  }

}
