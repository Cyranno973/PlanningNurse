import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {PlanningMois} from "../model/planning-mois";

@Injectable({
  providedIn: 'root'
})
export class PlanningService extends AbstractCrudRepository<PlanningMois> {
  constructor(private db: AngularFirestore) {
    super(db, '/rdvs');
  }

  getMois(id?: string): Promise<PlanningMois> {
    if (!id) {
      const date = new Date();
      id = `${date.getFullYear()}-${date.getMonth()}`
    }
    console.log(id);
    return this.findById(id);
  }
}
