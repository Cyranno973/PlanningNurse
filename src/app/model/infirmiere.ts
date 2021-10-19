import DatabaseModel from "../repository/AbstractCrudRepository";

export default class Infirmiere extends DatabaseModel {
  nom: string;
  prenom: string;
  password: string;
  mail: string;
  tel: number;
  trg: string;
}
