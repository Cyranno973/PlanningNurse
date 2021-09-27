import {Injectable} from '@angular/core';
import Infirmiere from "../model/infirmiere";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class InfirmiereService {

  private dbPath = '/infirmieres';

  infirmieresRef: AngularFirestoreCollection<Infirmiere>;

  constructor(private db: AngularFirestore) {
    this.infirmieresRef = db.collection<Infirmiere>(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Infirmiere> {
    return this.infirmieresRef;
  }

  create(tutorial: Infirmiere): any {
    return this.infirmieresRef.add({...tutorial});
  }

  update(id: string, data: any): Promise<void> {
    return this.infirmieresRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.infirmieresRef.doc(id).delete();
  }
}
