import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {Mois, Rdv} from "../model/planning-rdv";
import {PatientRdvsService} from "./patient-rdvs.service";
import {PatientRdvs} from "../model/patient-rdvs";
import {RdvsService} from "./rdvs.service";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class PlanningService extends AbstractCrudRepository<Mois> {
  constructor(db: AngularFirestore, private prs: PatientRdvsService, private rs: RdvsService) {
    super(db, '/mois');
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
        if (mois) {
          if (mois.jours) {
            mois.jours = Object.keys(mois.jours).reduce((jours, key) => jours.set(Number(key), mois.jours[key]), new Map<number, Rdv[]>());

            for (let entry of mois.jours.entries()) {
              entry[1].forEach(r => {
                Object.keys(r)
                  .filter(prop => r[prop] instanceof firebase.firestore.Timestamp)
                  .forEach(prop => r[prop] = r[prop].toDate());
              });
            }
          } else {
            mois.jours = new Map<number, Rdv[]>()
          }
        }
        return mois ? mois : new Mois(id);
      });
  }

  save(mois: Mois, rdv: Rdv): Promise<PatientRdvs> {
    // si le rdv existe, on le met à jour et on met à jour en cascade les collections contenant le rdv
    if (rdv.id)
      return this.rs.update(rdv.id, rdv)
        .then(r => this.saveDerivedRdvs(r, mois));

    return this.rs.create(rdv)
      .then(r => this.saveDerivedRdvs(r, mois));
  }

  private saveDerivedRdvs(rdv: Rdv, mois: Mois) {
    // Récupère les rdvs d'un patient et ajoute s'il n'existe pas
    const promisePatientRdvs = this.getPromisePatientRdvs(rdv);

    // Exécute en parallèle la promesse d'enregistrement de PatientRdv et du Mois
    return Promise.all([promisePatientRdvs, this.update(mois.id, mois)])
      .then((pratientRdvsMonth) => pratientRdvsMonth[0]);
  }

  private getPromisePatientRdvs(rdv: Rdv) {
    return this.prs.findById(rdv.patient.id, false)
      .then(pr => {
        if (pr?.rdvs) {
          // Récupère l'index du rdv pour savoir si c'est une MAJ ou un nouveau rdv
          const index = pr.rdvs.findIndex(r => r.id === rdv.id);
          if (index > -1)
            pr.rdvs[index] = rdv; // Met à jour le RDV
          else
            pr.rdvs.push(rdv); // Ajoute le rdv

          // Trie les rdvs par date
          pr.rdvs.sort((a, b) => b.date.getTime() - a.date.getTime())
        } else
          pr = new PatientRdvs(rdv.patient.id, [rdv]);
        return this.prs.update(pr.id, pr);
      });
  }
}
