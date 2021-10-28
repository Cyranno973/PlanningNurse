export enum RdvStatusCode {
  SOUHAITE = 'SOUHAITE',
  VALIDE = 'VALIDE',
  CONFIRME = 'CONFIRME'
}

export class RdvStatus {
  static readonly SOUHAITE = new RdvStatus(RdvStatusCode.SOUHAITE, 'Souhaité');
  static readonly VALIDE = new RdvStatus(RdvStatusCode.VALIDE, 'Validé');
  static readonly CONFIRME = new RdvStatus(RdvStatusCode.CONFIRME, 'Confirmé');

  constructor(public code: RdvStatusCode, public label: string) {
  }

  static getLabel(code: RdvStatusCode) {
    return Object.values(this).find(s => s.code)
  }
}
