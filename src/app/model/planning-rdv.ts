import {DatabaseModel} from "../repository/AbstractCrudRepository";
import {RdvStatutCode} from "./enums/rdv-statut";
import {Soignant} from "./soignant";
import {Patient} from "./patient";
import {Utils} from "../shared/Utils";

export class Rdv extends DatabaseModel {
  date: Date;
  statut: RdvStatutCode = RdvStatutCode.SOUHAITE;
  soignant: Soignant;
  patient: Patient;
  // en minutes
  heure: number;
  fin?: Date;
  duree?: number;
  recurrence?: {
    dateDebut: Date;
    dateFin: Date;
  };
  notes: string;

  constructor(id: string, heure: number, patient: Patient, date: Date, duree: number, soignant?: Soignant, status?: RdvStatutCode) {
    super();
    this.id = id;
    this.heure = heure;
    this.patient = patient;
    this.date = date;
    this.date.setHours(Utils.toHours(heure), Utils.toMinutes(heure));
    this.duree = duree;
    this.statut = status ?? RdvStatutCode.SOUHAITE;

    if (soignant) this.soignant = new Soignant({id: soignant.id, nom: soignant.nom, prenom: soignant.prenom, trg: soignant.trg});
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
    this.jours = new Map<number, Rdv[]>()
  }
}
