import Infirmiere from "./infirmiere";

export default class Patient {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  address: string;
  dateNaissance: Date;
  telephone: {
    mobile: string;
    fixe: string;
    autre: string;
  }
  lastUpdate: Date;
  dateCreation: Date;
  modifiedBy: Infirmiere;

  public constructor(init?: Partial<Patient>) {
    const patient = Object.assign(this, init);
    patient.dateNaissance = new Date(init.dateNaissance);
    return patient;
  }
}
