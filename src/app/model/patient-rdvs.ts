import {DatabaseModel} from "../repository/AbstractCrudRepository";
import {Rdv} from "./planning-rdv";

export class PatientRdvs extends DatabaseModel {
  rdvs: Rdv[];

  constructor(patientId: string, rdvs: Rdv[]) {
    super();
    this.id = patientId;
    this.rdvs = rdvs;
  }
}
