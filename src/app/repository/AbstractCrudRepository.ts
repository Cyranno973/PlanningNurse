import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

export class AbstractCrudRepository<T> {
  ref: AngularFirestoreCollection<T>

  constructor(private db: AngularFirestore, private dbPath: string) {
    this.ref = db.collection<T>(dbPath);
  }

  getAll(): Observable<T[]> {
    return this.ref.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    );
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
}
