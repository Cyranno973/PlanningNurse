import {Component, OnDestroy, OnInit} from '@angular/core';
import {PatientRepository} from "../repository/patient-repository.service";
import {Patient} from "../model/patient";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {KeyValue} from "@angular/common";
import {FormPatientComponent} from "./patient/form-patient/form-patient.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit, OnDestroy {

  patients: Patient[];
  searchForm: FormGroup;
  searchResults: Patient[] = [];
  searchFilters: KeyValue<string, string>[] = []; // Filtre de recherche de patients
  subscription: Subscription;
  private modalRef: DynamicDialogRef;

  constructor(private patientRepo: PatientRepository, private fb: FormBuilder, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
        nom: [''], prenom: ['']
      }
    );

    // TODO : Paginer la requête pour ne pas tout lire à chaque fois
    this.subscription = this.patientRepo.getAll().subscribe(data => {
      this.patients = data;
      this.refreshSearch();
    });
  }

  searchString(key: string) {
    this.updateSearchFilters(key);
    this.refreshSearch();
  }

  // TODO : Lancer la requête avec un bouton ou après quelques ms de délai en cherchant en BDD car les patients seront paginés
  private refreshSearch() {
    // Filtre les patients dont la valeur des champs du formulaire correspondent
    this.searchResults = this.patients.filter(patient =>
      this.searchFilters.every(filtre => new RegExp(filtre.value, 'ig').test(patient[filtre.key]))
    );
  }

// Met à jour les filtres de recherche par rapport au champ modifié
  private updateSearchFilters(key: string) {
    const value = this.searchForm.get(key).value;
    const index = this.searchFilters.findIndex(filtre => filtre.key === key);

    if (value) { // Ajoute ou remplace le filtre de recherche dans searchFilters
      index === -1 ? this.searchFilters.push({key, value}) : this.searchFilters[index].value = value;
    } else if (!value && index !== -1) { // Supprime le filtre si vide
      this.searchFilters.splice(index, 1);
    }
  }

  addPatient() {
    this.modalRef = this.dialogService.open(FormPatientComponent, {header: 'Nouveau patient', closable: false, styleClass: 'custom-modal patient'});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
