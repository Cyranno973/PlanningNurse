export enum RdvStatutCode {
  SOUHAITE = 'SOUHAITE',
  CONFIRME = 'CONFIRME',
  VALIDE = 'VALIDE',
  ANNULE = 'ANNULE'
}

export class RdvStatut {
  static readonly SOUHAITE = new RdvStatut(RdvStatutCode.SOUHAITE, 'Souhaité');
  static readonly CONFIRME = new RdvStatut(RdvStatutCode.CONFIRME, 'Confirmé');
  static readonly VALIDE = new RdvStatut(RdvStatutCode.VALIDE, 'Validé');
  static readonly ANNULE = new RdvStatut(RdvStatutCode.ANNULE, 'Annulé');

  constructor(public code: RdvStatutCode, public label: string) {
  }

  static all(): RdvStatut[] {
    return Object.keys(RdvStatut).map(v => RdvStatut[v]);
  }
}
