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
  // 10h15, 12h00....
  heure: number;
  duree?: number;
  recurrence?: {
    dateDebut: Date;
    dateFin: Date;
  };
  notes: string;

  constructor(id: string, heure: number, patient: Patient, date: Date, soignant?: Soignant, status?: RdvStatutCode) {
    super();
    this.id = id;
    this.heure = heure;
    this.patient = {id: patient.id, nom: patient.nom, prenom: patient.prenom};
    this.date = date;
    this.date.setHours(Utils.toHours(heure), Utils.toMinutes(heure));
    this.statut = status ?? RdvStatutCode.SOUHAITE;

    if (soignant) this.soignant = new Soignant(soignant);
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

  static fromDate(date: Date) {
    if (!date) return '';
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  }
}
