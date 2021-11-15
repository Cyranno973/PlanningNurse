import {Injectable} from '@angular/core';
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {Rdv} from "../model/planning-rdv";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class RdvsService extends AbstractCrudRepository<Rdv> {
  constructor(db: AngularFirestore) {
    super(db, '/rdvs');
  }
}
