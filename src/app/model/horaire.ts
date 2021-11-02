import {Utils} from "../shared/Utils";

export class Horaire {
  heure: number;
  heureString?: string;

  constructor(heure: number) {
    this.heure = heure;
    this.heureString = Utils.toDisplayTime(this.heure)
  }
}
