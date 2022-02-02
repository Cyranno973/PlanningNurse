import {Horaire} from "../model/horaire";
import {Mois, Rdv} from "../model/planning-rdv";

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
    return `${hours}h${minutes || '00'}`;
  }

  /**
   * Retourne une liste de créneaux horaires
   * @param duree en minutes
   */
  static getHoraires(duree: number = 30): Horaire[] {
    // Unités de temps en minutes
    const debut: number = 540; // 9h00
    const fin: number = 1080; // 18h00
    const horaires: Horaire[] = [];
    for (let heure = debut; heure < fin; heure += duree) {
      horaires.push(new Horaire(heure));
    }
    return horaires;
  }

  static toHours(time: number): number {
    return Math.floor(time / 60);
  }

  static toMinutes(num): number {
    return num % 60;
  }

  /**
   * Supprime un RDV d'un mois <br/> /!\ Affecte le mois directement
   * @param mois
   * @param rdv
   */
  static removeRdv(mois: Mois, rdv: Rdv): void {
    if (!mois || !rdv) return;
    const rdvsFilterd = mois.jours.get(rdv.date.getDate()).filter(r => r.id !== rdv.id);
    mois.jours.set(rdv.date.getDate(), rdvsFilterd);
  }

  // Retourne mm-yyyy à partir d'une date
  static moisFromDate(date: Date): string {
    return date ? `${date.getFullYear()}-${date.getMonth() + 1}` : '';
  }
}
