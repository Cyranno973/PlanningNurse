import {DatabaseModel} from "../repository/AbstractCrudRepository";
import {RdvStatus} from "./enums/rdv-status";
import {Soignant} from "./soignant";
import {Patient} from "./patient";

export class Rdv {
  id: string;
  statut: RdvStatus = RdvStatus.SOUHAITE;
  soignant?: Soignant;
  patient?: Patient;
  // 10h15, 12h00....
  heure: number;
  duree?: number;
  recurrence?: {
    dateDebut: Date;
    dateFin: Date;
  }

  constructor(heure: number, patient: Patient, soignant?: Soignant) {
    this.heure = heure;
    this.patient = {id: patient.id, nom: patient.nom, prenom: patient.prenom};

    if (soignant)
      this.soignant = {id: soignant.id, nom: soignant.nom, prenom: soignant.prenom};
    this.id = `${patient.id}-${heure}`
  }
}

export class Mois extends DatabaseModel {
  // Correspond à l'année + le mois. Exemple '2021-10'
  id: string;
  // la clé de la Map correspond au jour du mois 1, ...31
  jours: Map<number, Rdv[]> = new Map<number, Rdv[]>();

  constructor(id?: string) {
    super();
    this.id = id;
  }
}
