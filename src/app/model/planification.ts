import {DatabaseModel} from "../repository/AbstractCrudRepository";
import {Soignant} from "./soignant";
import {PlanifUtils} from "../shared/PlanifUtils";

export class Planification extends DatabaseModel {
  de: Date;
  a?: Date;
  current?: boolean;
  soignant?: Soignant;
  temporaire?: boolean;
  touched?: boolean;

  constructor(de: Date, a: Date) {
    super();
    const today = new Date();
    this.id = today.getTime().toString();
    this.de = de;
    this.a = a;
    this.temporaire = true;
    PlanifUtils.computeCurrent(this);
  }
}
