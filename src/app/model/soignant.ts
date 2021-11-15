import {DatabaseModel} from "../repository/AbstractCrudRepository";

export class Soignant extends DatabaseModel {
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

  public static fullName(s: Soignant): string {
    return `${s?.prenom} ${s?.nom}`;
  }
}
