import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import firebase from "firebase/compat/app";

class Id {
  id: string;
  lastUpdate: Date;
  dateCreation: Date;
}

export class AbstractCrudRepository<T extends Id> {
  private ref: AngularFirestoreCollection<T>

  constructor(db: AngularFirestore, dbPath: string) {
    this.ref = db.collection<T>(dbPath);
  }

  getAll(): Observable<T[]> {
    return this.ref.snapshotChanges().pipe(
      map(changes => changes.map(c => ({id: c.payload.doc.id, ...this.toDates(c.payload.doc.data())})))
    );
  }

  findById(id: string): Promise<T> {
    return this.ref.doc(id).ref.get()
      .then(doc => {
        if (doc.exists) return {id, ...this.toDates(doc.data())};
        throw `Aucun document trouvé avec l'id=[${id}]`;
      });
  }

  create(object: T): Promise<T> {
    object.dateCreation = new Date();
    return this.ref.add({...this.cleanObject(object)})
      .then(createdDocRef => {
        object.id = createdDocRef.id
        return object;
      });
  }

  update(id: string, data: T): Promise<T> {
    data.lastUpdate = new Date();
    return this.ref.doc(id).set({...this.cleanObject(data)})
      .then(() => {
        data.id = id;
        return this.toDates(data);
      });
  }

  delete(id: string): Promise<void> {
    return this.ref.doc(id).delete();
  }

  // Convertit les timestamps des objets en Dates
  private toDates(object: any): any {
    Object.keys(object)
      .filter(key => object[key] instanceof firebase.firestore.Timestamp)
      .forEach(key => object[key] = object[key].toDate())
    return object;
  }

  // Supprime les champs vides ("") / null ou objets vides ({})
  private cleanObject(obj) {
    return Object.entries(obj)
      .map(([k, v]) => [k, v && typeof v === 'object' && Object.prototype.toString.call(v) !== "[object Date]" ? this.cleanObject(v) : v])
      .reduce((a, [k, v]) => {
        console.log(v);
        return (v == null || (!Object.keys(v).length && Object.prototype.toString.call(v) !== "[object Date]") ? a : (a[k] = v, a));
      }, {});
  }
}
