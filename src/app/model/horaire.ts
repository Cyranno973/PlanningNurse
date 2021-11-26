import {Utils} from "../shared/Utils";
import {HoraireStatut} from "./enums/horaire-statut";
import {Rdv} from "./planning-rdv";

export class Horaire {
  heure: number;
  statut: HoraireStatut = HoraireStatut.DISPONIBLE;
  heureString?: string;
  rdvs?: Rdv[];

  constructor(heure: number) {
    this.heure = heure;
    this.heureString = Utils.toDisplayTime(this.heure)
    this.statut = HoraireStatut.DISPONIBLE;
  }
}
