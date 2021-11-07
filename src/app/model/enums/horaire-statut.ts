import {RdvStatutCode} from "./rdv-statut";

export enum HoraireStatutCode {
  A_CONFIRMER = 'A_CONFIRMER',
  LIBRE = 'LIBRE',
  COMPLET = 'COMPLET'
}

export class HoraireStatut {
  static readonly A_CONFIRMER = new HoraireStatut(HoraireStatutCode.A_CONFIRMER, 'A confirmer', '#805b36', '#ffd8b2');
  static readonly DISPONIBLE = new HoraireStatut(HoraireStatutCode.LIBRE, 'Disponible', '#256029', '#C8E6C9');
  static readonly COMPLET = new HoraireStatut(HoraireStatutCode.COMPLET, 'Complet', '#c63737', '#ffcdd2');

  constructor(public code: HoraireStatutCode, public label: string, public colorHigh: string, public colorLow: string) {
  }

  static all(): HoraireStatut[] {
    return Object.keys(HoraireStatut).map(v => HoraireStatut[v]);
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
