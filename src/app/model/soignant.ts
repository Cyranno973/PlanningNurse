import {DatabaseModel} from "../repository/AbstractCrudRepository";
import {Personne} from "./Personne";

export class Soignant extends DatabaseModel implements Personne {
  nom: string;
  prenom: string;
  trg: string;
  password?: string;
  mail?: string;
  tel?: number;

  constructor(init?: Partial<Soignant>) {
    super();
    return Object.assign(this, init);
  }
}
