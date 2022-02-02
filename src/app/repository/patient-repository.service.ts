import {Injectable} from '@angular/core';
import {Patient} from "../model/patient";
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class PatientRepository extends AbstractCrudRepository<Patient> {
  constructor(db: AngularFirestore) {
    super(db, '/patients');
  }
}
