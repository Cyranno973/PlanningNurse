import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {Mois, Rdv} from "../model/planning-rdv";
import {PatientRdvsService} from "./patient-rdvs.service";
import {PatientRdvs} from "../model/patient-rdvs";

@Injectable({
  providedIn: 'root'
})
export class PlanningService extends AbstractCrudRepository<Mois> {
  constructor(private db: AngularFirestore, private prs: PatientRdvsService) {
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

  save(mois: Mois, rdv: Rdv): Promise<[PatientRdvs, Mois]> {
    // Récupère les rdvs d'un patient et ajoute s'il n'existe pas
    const promisePatientRdvs = this.prs.findById(rdv.patient.id, false)
      .then(pr => {
        if (pr?.rdvs) pr.rdvs.push(rdv);
        else pr = new PatientRdvs(rdv.patient.id, [rdv]);
        return this.prs.update(pr.id, pr);
      })

    // Exécute en parallèle la promesse d'enregistrement de PatientRdv et du Mois
    return Promise.all([promisePatientRdvs, this.update(mois.id, mois)]);
  }
}
