import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Timestamp} from 'firebase/firestore'

export class AbstractCrudRepository<T> {
  private ref: AngularFirestoreCollection<T>

  constructor(private db: AngularFirestore, private dbPath: string) {
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

  create(object: T): any {
    return this.ref.add({...object});
  }

  update(id: string, data: any): Promise<void> {
    return this.ref.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.ref.doc(id).delete();
  }

  // Convertit les timestamps des objets en Dates
  private toDates(object: T): T {
    Object.keys(object)
      .filter(key => object[key] instanceof Timestamp)
      .forEach(key => object[key] = object[key].toDate())
    return object;
  }
}
