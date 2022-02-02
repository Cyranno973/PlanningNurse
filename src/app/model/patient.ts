import {DatabaseModel} from "../repository/AbstractCrudRepository";
import {Soignant} from "./soignant";
import {Personne} from "./Personne";

export class Patient extends DatabaseModel implements Personne {
  prenom: string;
  nom: string;
  email?: string;
  address?: string;
  dateNaissance?: Date;
  tel?: {
    mobile?: string;
    fixe?: string;
    autre?: string;
  };
  soignant?: Soignant;

  constructor(init?: Partial<Patient>) {
    super();
    const patient = Object.assign(this, init);
    if (init?.dateNaissance)
      patient.dateNaissance = new Date(init?.dateNaissance);
    return patient;
  }
}
