import {Injectable} from '@angular/core';
import {Soignant} from "../model/soignant";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AbstractCrudRepository} from "./AbstractCrudRepository";

@Injectable({
  providedIn: 'root'
})
export class SoignantService extends AbstractCrudRepository<Soignant> {
  constructor(private db: AngularFirestore) {
    super(db, '/infirmieres');
  }
}
