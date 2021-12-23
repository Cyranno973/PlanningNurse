import {RdvStatutCode} from "./rdv-statut";

export class HoraireStatut {
  static readonly A_CONFIRMER = new HoraireStatut('A_CONFIRMER', 'A confirmer', '#805b36', '#ffd8b2');
  static readonly DISPONIBLE = new HoraireStatut('LIBRE', 'Disponible', '#256029', '#C8E6C9');
  static readonly COMPLET = new HoraireStatut('COMPLET', 'Complet', '#c63737', '#ffcdd2');

  constructor(public code: string, public label: string, public colorHigh: string, public colorLow: string) {
  }

  static fromRdvStatut(rdvStatutCode: RdvStatutCode): HoraireStatut {
    switch (rdvStatutCode) {
      case RdvStatutCode.SOUHAITE:
      case RdvStatutCode.CONFIRME:
        return HoraireStatut.A_CONFIRMER;
      case RdvStatutCode.VALIDE:
        return HoraireStatut.COMPLET
      case RdvStatutCode.ANNULE:
      default:
        return HoraireStatut.DISPONIBLE
    }
  }
}
