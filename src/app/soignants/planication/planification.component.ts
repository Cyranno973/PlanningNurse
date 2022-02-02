import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {PlanificationRepository} from "../../repository/planification-repository.service";
import {Soignant} from "../../model/soignant";
import {take} from "rxjs/operators";
import {SoignantRepository} from "../../repository/soignant-repository.service";
import {Planification} from "../../model/planification";
import {Subscription} from "rxjs";
import {PlanifUtils} from "../../shared/PlanifUtils";

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlanificationComponent implements OnInit, OnDestroy {

  planificationsBkp: Planification[] = [];
  planifications: Planification[] = [];
  datePlanif = new Date();
  soignants: Soignant[];
  elementsToSave: number = 0;

  private subs: Subscription = new Subscription();

  constructor(private planificationRepo: PlanificationRepository, private soignantRepo: SoignantRepository) {
  }

  ngOnInit(): void {
    this.loadSoignants();
    this.loadCurrentPlanification();
  }

  loadSoignants() {
    // Si déjà récupérés, on ne les recharge pas
    if (this.soignants?.length) return;

    this.subs.add(this.soignantRepo.getAll()
      .pipe(take(1))
      .subscribe(
        soignants => this.soignants = soignants,
        err => console.error(`Erreur pendant la récupération des soignants`, err)));
  }

  loadCurrentPlanification() {
    this.subs.add(this.planificationRepo.getLast()
      .subscribe(
        planifsDb => this.planifications = planifsDb,
        err => console.error(err)
      ));
  }

  nouvelleLigne() {
    this.updatePlanif(() => {
      if (this.planifications.length)
        this.planifications.unshift(PlanifUtils.semaineSuivante(this.planifications));
      else
        this.planifications.unshift(PlanifUtils.semaineEnCours());
    });
  }

  changeDates(planif: Planification, range: Date[]) {
    this.updatePlanif(() => {
      const planification = PlanifUtils.findIn(this.planifications, planif);
      planification.de = range[0];
      planification.a = range[1];
      PlanifUtils.computeCurrent(planification);
    }, planif);
  }

  changeSoignant(planif: Planification, soignant: Soignant) {
    this.updatePlanif(() => {
      const planification = PlanifUtils.findIn(this.planifications, planif);
      planification.soignant = soignant;
    }, planif);
  }

  enregistrer(planif?: Planification) {
    if (planif) {
      const index = PlanifUtils.index(this.planifications, planif);
      const planifToSave = {de: planif.de, a: planif.a, soignant: planif.soignant};
      const save: Promise<Planification> = planif.temporaire ?
        this.planificationRepo.create(planifToSave) :
        this.planificationRepo.update(planif.id, planifToSave);

      save
        .then(saved => {
          PlanifUtils.computeCurrent(saved);
          this.planifications[index] = saved;
          PlanifUtils.trier(this.planifications, 'de');
          this.backup(saved);
          this.updateToSave();
        })
        .catch(err => console.error(`Impossible de sauvegarder la planification`, err));
    } else { // Sinon on sauvegarde chaque planif une à une en mode récursif
      this.planifications
        .filter(p => p.touched || p.temporaire)
        .forEach(p => this.enregistrer(p));
    }
  }

  supprimer(planif: Planification) {
    this.planificationRepo.delete(planif.id)
      .then(() => {
        this.planifications = this.planifications.filter(p => p.id !== planif.id);
        this.planificationsBkp = this.planificationsBkp.filter(p => p.id !== planif.id);
      })
      .catch(err => console.error(`Impossible de supprimer la planification`, err));

    this.updateToSave();
  }

  restaureBkp(planif?: Planification) {
    if (planif) { // Restaure uniquement la planif en param
      const index = PlanifUtils.index(this.planifications, planif);
      this.planifications[index] = {...PlanifUtils.findIn(this.planificationsBkp, planif)};
    } else { // Restaure tout
      this.planifications = [...this.planificationsBkp];
      this.planificationsBkp = [];
    }

    this.updateToSave();
  }

  // Sauvegarde une copie en mémoire pour annuler les modfications
  // Ou met à jour une planif dans le backup
  private backup(planif ?: Planification) {
    if (!this.planificationsBkp.length)
      this.planificationsBkp = this.planifications
        .filter(p => !p.temporaire)
        .map(planif => ({...planif}));

    // Backup unitaire
    if (planif) {
      const index = PlanifUtils.index(this.planificationsBkp, planif);
      if (index > -1) {
        this.planificationsBkp[index] = planif;
      } else {
        this.planificationsBkp.push(planif);
        PlanifUtils.trier(this.planificationsBkp, 'de');
      }
    }
  }

  private updateToSave() {
    this.elementsToSave = this.planifications.filter(p => p.touched || p.temporaire).length;
  }

  // 1. Backup la planification
  // 2. Execute le code de modification
  // 3. Marque la planif 'touched'
  // 4. Recalcule les planifsToSave
  private updatePlanif(exec: Function, planif?: Planification) {
    this.backup(planif);
    exec.apply(planif);
    if (planif) {
      planif.touched = !planif.temporaire;
    }
    this.updateToSave();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
