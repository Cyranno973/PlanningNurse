import DatabaseModel from "../repository/AbstractCrudRepository";

export class Patient extends DatabaseModel {
  prenom: string;
  nom: string;
  email: string;
  address: string;
  dateNaissance: Date;
  telephone: {
    mobile: string;
    fixe: string;
    autre: string;
  };

  public constructor(init?: Partial<Patient>) {
    super();
    const patient = Object.assign(this, init);
    patient.dateNaissance = new Date(init.dateNaissance);
    return patient;
  }
}
