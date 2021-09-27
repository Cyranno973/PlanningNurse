import {Injectable} from '@angular/core';
import {Patient} from "../model/patient";
import {Observable, Subject} from "rxjs";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/compat/database";
import {AngularFirestore} from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patientTest: AngularFireObject<any>;
  items: Observable<Patient[]>;

  constructor(private af: AngularFirestore, private angularDatabase: AngularFireDatabase) {
    //on defini la table ou le noeud utilisé
    this.patientTest = angularDatabase.object('/patientss');
    //on defini le type de flux valueChanges() snapshotChanges() stateChanges() auditTrail()
    this.items = this.patientTest.valueChanges();
  }

  patients: Patient[] = [];
  patientsSubject = new Subject<Patient[]>();

  emitPatients() {
    this.patientsSubject.next(this.patients);
  }

  savePatients(prenom: any) {
    this.angularDatabase.object('patients').set(prenom)
      .then(
        test => console.log('yess', test),
        (error) => console.log('no', error)
      ).catch(
      (error) => console.log('none', error)
    );
    console.log('ici')

  }

  create(patient: Patient) {
    this.patientTest.set(patient)
      .then(
        test => console.log('yess', test),
        (error) => console.log('no', error)
      ).catch(
      (error) => console.log('none', error)
    );
    console.log('create')

  }
}
