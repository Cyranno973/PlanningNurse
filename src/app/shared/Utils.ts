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

    const hours = this.toHours(num);
    const minutes = this.toMinutes(num);
    return `${hours}h${minutes ? minutes : '00'}`;
  }

  static toHours(time: number): number {
    return Math.floor(time / 60);
  }

  static toMinutes(num) {
    return num % 60;
  }
}

