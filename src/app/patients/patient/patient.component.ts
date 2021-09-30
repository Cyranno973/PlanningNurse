import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {City, TypeSoin} from "../../model/typeSoin";
import {ActivatedRoute} from "@angular/router";


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
  infotest: any;
  patientId: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    console.log(this.patientId);

    this.initForm();

    // soinsEnum: SelectItem[] = Object.values(Soins).map(soin => ({labe: soin, value: soin}));
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

  initForm() {
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
