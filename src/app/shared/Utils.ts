export class Utils {

  private static readonly HEURE_MAX_JOUR_EN_MINUTES: number = 1439; // 23h59

  /**
   * Convertit une heure en minute en hh'h'MM
   * Exemple : 540 => 9h00
   * @param num heure en minutes
   */
  static toDisplayTime(num): string {
    if (num > this.HEURE_MAX_JOUR_EN_MINUTES) {
      throw 'heure invalide';
    }

    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h${minutes ? minutes : '00'}`;
  }
}

