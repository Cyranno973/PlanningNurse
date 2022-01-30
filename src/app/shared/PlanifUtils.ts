import {Planification} from "../model/planification";

export class PlanifUtils {
  static getLundi(date: Date): Date { // https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  static getProchainLundi(date: Date): Date { // https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
    const nextWeek = new Date(date.setDate(date.getDate() + 7));
    return this.getLundi(nextWeek);
  }

  static computeCurrent(planification: Planification): void {
    const today = new Date();
    const dateDeDebutInferieurOuEgale = planification.de <= today;
    const dateDeFinSuperieurOuEgale = !planification.a || today <= planification.a;
    planification.current = dateDeDebutInferieurOuEgale && dateDeFinSuperieurOuEgale;
  }

  static trier(tableau: any[], cle: string): void {
    tableau.sort((el1, el2) => el2[cle].getTime() - el1[cle].getTime());
  }

  static findIn(tableau: Planification[], planif: Planification) {
    return tableau.find(p => p.id === planif.id);
  }

  static index(tableau: Planification[], planif: Planification) {
    return tableau.findIndex(p => p.id === planif.id);
  }

  static semaineEnCours(): Planification {
    const lundi = this.getLundi(new Date());
    const dimanche = new Date(new Date(lundi).setDate(lundi.getDate() + 6));
    return new Planification(lundi, dimanche);
  }

  static semaineSuivante(planifs: Planification[]): Planification {
    const copie = [...planifs];
    // Trie la copie par date de démarrage pour avoir le plus récent et calculer la semaine qui suit
    this.trier(copie, 'de');
    const laPlusrecente = copie[0];
    let lundi = this.getProchainLundi(laPlusrecente.de);
    if (laPlusrecente.a) {
      lundi = this.getProchainLundi(laPlusrecente.a);
    }
    const dimanche = new Date(new Date(lundi).setDate(lundi.getDate() + 6));
    return new Planification(lundi, dimanche);
  }
}
