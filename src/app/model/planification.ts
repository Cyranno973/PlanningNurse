import {DatabaseModel} from "../repository/AbstractCrudRepository";
import {Soignant} from "./soignant";

export interface Periode {
  dates: Date[];
  soignant: Soignant;
}

export interface PlanificationMois extends DatabaseModel {
  // Correspond à yyyy-MM. Exemple '2021-10'
  id: string;
  periodes: Periode[]
}
