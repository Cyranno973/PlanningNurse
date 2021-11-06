export enum RdvStatusCode {
  SOUHAITE = 'SOUHAITE',
  CONFIRME = 'CONFIRME',
  VALIDE = 'VALIDE',
  ANNULE = 'ANNULE'
}

export class RdvStatus {
  static readonly SOUHAITE = new RdvStatus(RdvStatusCode.SOUHAITE, 'Souhaité', '#8a5340', '#feedaf');
  static readonly CONFIRME = new RdvStatus(RdvStatusCode.CONFIRME, 'Confirmé', '#23547b', '#b3e5fc');
  static readonly VALIDE = new RdvStatus(RdvStatusCode.VALIDE, 'Validé', '#256029', '#c8e6c9');
  static readonly ANNULE = new RdvStatus(RdvStatusCode.ANNULE, 'Annulé', '#000000', '#BDBDBD');

  constructor(public code: RdvStatusCode, public label: string,
              public colorHigh: string, public colorLow: string) {
  }

  static all(): RdvStatus[] {
    return Object.keys(RdvStatus).map(v => RdvStatus[v]);
  }
}
