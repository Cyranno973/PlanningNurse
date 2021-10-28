import {Injectable} from '@angular/core';
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PatientRdvs} from "../model/patient-rdvs";

@Injectable({
  providedIn: 'root'
})
export class PatientRdvsService extends AbstractCrudRepository<PatientRdvs> {
  constructor(private db: AngularFirestore) {
    super(db, '/patient-rdvs');
  }
}
