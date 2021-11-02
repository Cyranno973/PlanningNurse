import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {Mois, Rdv} from "../model/planning-rdv";

@Injectable({
  providedIn: 'root'
})
export class PlanningService extends AbstractCrudRepository<Mois> {
  constructor(private db: AngularFirestore) {
    super(db, '/planning-rdvs');
  }

  /**
   * Récupère le mois en cours de la BDD et s'il n'existe pas, renvoie un nouveau
   * @param id id du mois (ex: 2021-10)
   */
  getMois(id?: string): Promise<Mois> {
    if (!id) {
      const date = new Date();
      id = `${date.getFullYear()}-${date.getMonth() + 1}`
    }
    return this.findById(id, false)
      .then(mois => {
        if (mois?.jours)
          mois.jours = Object.keys(mois.jours)
            .reduce((jours, key) => jours.set(Number(key), mois.jours[key]), new Map<number, Rdv[]>());

        return mois ? mois : new Mois(id);
      });
  }
}
