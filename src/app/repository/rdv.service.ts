import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import Rdv from "../model/rdv";

@Injectable({
  providedIn: 'root'
})
export class RdvService extends AbstractCrudRepository<Rdv> {
  constructor(private db: AngularFirestore) {
    super(db, '/rdvs');
  }
}
