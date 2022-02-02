import {Injectable} from '@angular/core';
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PatientRdvs} from "../model/patient-rdvs";

@Injectable({
  providedIn: 'root'
})
export class PatientRdvsRepository extends AbstractCrudRepository<PatientRdvs> {
  constructor(db: AngularFirestore) {
    super(db, '/patient-rdvs');
  }
}
