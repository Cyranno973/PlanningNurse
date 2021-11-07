import {DatabaseModel} from "../repository/AbstractCrudRepository";
import {Soignant} from "./soignant";

export class Patient extends DatabaseModel {
  prenom: string;
  nom: string;
  email?: string;
  address?: string;
  dateNaissance?: Date;
  tel?: {
    mobile: string;
    fixe: string;
    autre: string;
  };
  soignant?: Soignant;

  public constructor(init?: Partial<Patient>) {
    super();
    const patient = Object.assign(this, init);
    patient.dateNaissance = new Date(init?.dateNaissance);
    return patient;
  }

  public static fullName(p: Patient): string {
    if (!p) return '';
    return `${p?.prenom} ${p?.nom}`;
  }
}
