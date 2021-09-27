import {Injectable} from '@angular/core';
import {Patient} from "../model/patient";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private dbPath = '/patients';

  patientsRef: AngularFirestoreCollection<Patient>;

  constructor(private db: AngularFirestore) {
    this.patientsRef = db.collection<Patient>(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Patient> {
    return this.patientsRef;
  }

  create(tutorial: Patient): any {
    return this.patientsRef.add({...tutorial});
  }

  update(id: string, data: any): Promise<void> {
    return this.patientsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.patientsRef.doc(id).delete();
  }
}
