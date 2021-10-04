import {Injectable} from '@angular/core';
import Patient from "../model/patient";
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class PatientService extends AbstractCrudRepository<Patient> {
  constructor(private db: AngularFirestore) {
    super(db, '/patients');
  }
}
