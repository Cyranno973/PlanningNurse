import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import firebase from "firebase/compat/app";

export class DatabaseModel {
  id?: string;
  lastUpdate?: Date;
  dateCreation?: Date;
}

export class Type {
  static readonly DATE = '[object Date]';
  static readonly NUMBER = '[object Number]';
  static readonly ARRAY = '[object Array]';
  static readonly MAP = '[object Map]';
  static readonly PRIMITIVES = [Type.DATE, Type.NUMBER];
}

export class AbstractCrudRepository<T extends DatabaseModel> {
  collection: AngularFirestoreCollection<T>
  db: AngularFirestore;
  dbPath: string;

  constructor(db: AngularFirestore, dbPath: string) {
    this.collection = db.collection<T>(dbPath);
    this.db = db;
    this.dbPath = dbPath;
  }

  getAll(): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map(changes => changes.map(c => ({id: c.payload.doc.id, ...this.fromFirestore(c.payload.doc.data())})))
    );
  }

  findById(id: string, failIfNotFound: boolean = true): Promise<T> {
    return this.collection.doc(id).ref.get()
      .then(doc => {
        if (doc.exists) return {id, ...this.fromFirestore(doc.data())} as T;
        if (failIfNotFound) throw `Aucun document trouvé avec l'id=[${id}]`;
        return null;
      });
  }

  create(object: T): Promise<T> {
    object.dateCreation = new Date();
    return this.collection.add({...this.toFirestore(object)})
      .then(createdDocRef => {
        object.id = createdDocRef.id
        return object as T;
      });
  }

  update(id: string, data: T): Promise<T> {
    data.lastUpdate = new Date();
    return this.collection.doc(id).set({...this.toFirestore(data)})
      .then(() => {
        data.id = id;
        return this.fromFirestore(data) as T;
      });
  }

  delete(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }

  // Convertit les timestamps des objets en Dates
  fromFirestore<T>(object: any): T {
    Object.keys(object)
      .filter(key => object[key] instanceof firebase.firestore.Timestamp || Array.isArray(object[key]))
      .forEach(key => {
        if (Array.isArray(object[key]))
          return object[key].map(prop => this.fromFirestore(prop));
        object[key] = object[key].toDate();
      });
    return object as T;
  }

  // Supprime les champs vides ("") / null ou objets vides ({})
  // Et Convertit les Map et tableaux d'objets en Objets javascript pur pour stocker dans Firestore
  private toFirestore(obj) {
    switch (Object.prototype.toString.call(obj)) {
      case Type.ARRAY:
        return obj.map(prop => Object.prototype.toString.call(prop) !== '[object Array]' ? this.toFirestore(prop) : Object.assign({}, prop));
      case Type.MAP:
        return this.toFirestore(Object.fromEntries(obj));
      case Type.NUMBER:
        return obj;
    }

    return Object.entries(obj)
      .map(([k, v]) => [k, v && typeof v === 'object' && !Type.PRIMITIVES.includes(Object.prototype.toString.call(v)) ? this.toFirestore(v) : v])
      .reduce((a, [k, v]) => (v == null || (!Object.keys(v).length && !Type.PRIMITIVES.includes(Object.prototype.toString.call(v))) ? a : (a[k] = v, a))
        , {});
  }
}
