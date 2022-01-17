import {Injectable} from '@angular/core';
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {PlanificationMois} from "../model/planification";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class PlanificationService extends AbstractCrudRepository<PlanificationMois> {

  constructor(db: AngularFirestore) {
    super(db, '/planifications');
  }
}
