import {Injectable} from '@angular/core';
import Infirmiere from "../model/infirmiere";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AbstractCrudRepository} from "./AbstractCrudRepository";

@Injectable({
  providedIn: 'root'
})
export class InfirmiereService extends AbstractCrudRepository<Infirmiere>{
  constructor(db: AngularFirestore) {
    super(db, '/infirmieres');
  }

}
