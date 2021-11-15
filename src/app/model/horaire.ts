import {Utils} from "../shared/Utils";
import {HoraireStatut} from "./enums/horaire-statut";

export class Horaire {
  heure: number;
  heureString?: string;
  statut: HoraireStatut = HoraireStatut.DISPONIBLE;

  constructor(heure: number) {
    this.heure = heure;
    this.heureString = Utils.toDisplayTime(this.heure)
    this.statut = HoraireStatut.DISPONIBLE;
  }
}
