export enum RdvStatutCode {
  SOUHAITE = 'SOUHAITE',
  CONFIRME = 'CONFIRME',
  VALIDE = 'VALIDE',
  ANNULE = 'ANNULE'
}

export class RdvStatut {
  static readonly SOUHAITE = new RdvStatut(RdvStatutCode.SOUHAITE, 'Souhaité', '#8a5340', '#feedaf');
  static readonly CONFIRME = new RdvStatut(RdvStatutCode.CONFIRME, 'Confirmé', '#23547b', '#b3e5fc');
  static readonly VALIDE = new RdvStatut(RdvStatutCode.VALIDE, 'Validé', '#256029', '#c8e6c9');
  static readonly ANNULE = new RdvStatut(RdvStatutCode.ANNULE, 'Annulé', '#000000', '#BDBDBD');

  constructor(public code: RdvStatutCode, public label: string,
              public colorHigh: string, public colorLow: string) {
  }

  static all(): RdvStatut[] {
    return Object.keys(RdvStatut).map(v => RdvStatut[v]);
  }
}
