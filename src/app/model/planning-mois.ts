import DatabaseModel from "../repository/AbstractCrudRepository";
import {RdvStatus} from "./enums/rdv-status";
import Infirmiere from "./infirmiere";

export class Rdv {
  statut: RdvStatus = RdvStatus.SOUHAITE;
  infirmiereId: string;
  infirmiere: Infirmiere;
  // 10h15, 12h00....
  heure: string;
}

export class PlanningJour {
  // Correspond au jour du mois 01, ...31
  id: number;
  rdvs: Rdv[];
}

export class PlanningMois extends DatabaseModel {
  // Correspond à l'année + le mois. Exemple '2021-10'
  id: string;
  jours: PlanningJour[];
}
