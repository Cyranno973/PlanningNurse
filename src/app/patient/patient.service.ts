import {Injectable} from '@angular/core';
import {Patient} from "../model/patient";
import {Subject} from "rxjs";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() {
  }

  patients: Patient[] = [];
  patientsSubject = new Subject<Patient[]>();

  emitPatients() {
    this.patientsSubject.next(this.patients);
  }

  savePatients(prenom: any) {
    firebase.database().ref('/patients').set(this.patients).then(() => console.log('yess'));
  }
}
