import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {RdvRepository} from "../../repository/rdv-repository.service";
import {Utils} from "../../shared/Utils";
import {Horaire} from "../../model/horaire";
import {Rdv} from "../../model/planning-rdv";
import {RdvStatut} from "../../model/enums/rdv-statut";
import {BehaviorSubject, combineLatest, Subscription} from "rxjs";
import {SoignantRepository} from "../../repository/soignant-repository.service";
import {switchMap, take, tap} from "rxjs/operators";
import {PatientRepository} from "../../repository/patient-repository.service";
import {Soignant} from "../../model/soignant";

@Component({
  selector: 'app-planning-perso',
  templateUrl: './planning-perso.component.html',
  styleUrls: ['./planning-perso.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlanningPersoComponent implements OnInit, OnDestroy {
  @Input()
  choixSoignants = false;
  @Output()
  openRdv = new EventEmitter<Rdv>();
  horaires: Horaire[] = [];
  soignants: Soignant[] = [];
  // TODO : Remplacer par le soignant connecté
  soignant: Soignant = {id: 'VEHHVVzuG1sf5osTy5Fs', nom: '', prenom: '', trg: ''};
  rdvStatus = RdvStatut;
  date: Date = new Date();
  loading = false;

  private subscriptions: Subscription = new Subscription();
  private dateSubject = new BehaviorSubject<Date>(this.date);
  private soignantSubject = new BehaviorSubject<Soignant>(this.soignant);

  constructor(private soignantRepo: SoignantRepository,
              private rdvRepo: RdvRepository,
              private patienRepo: PatientRepository) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.horaires = Utils.getHoraires(60);

    if (this.choixSoignants) {
      this.loadSoignants();
    }

    this.subscriptions.add(combineLatest([this.dateSubject, this.soignantSubject])
      .pipe(
        tap(() => this.loading = true),
        switchMap(params => this.rdvRepo.getBySoignantId(params[1].id, this.date)),
        tap(() => this.loading = false)
      ).subscribe(rdvs => {
        this.horaires.forEach(h => h.resetRdvs());
        this.ajouteRdvsAuxHoraires(rdvs);
      }));
  }

  loadSoignants() {
    // Si déjà récupérés, on ne les recharge pas
    if (this.soignants?.length) return;

    this.subscriptions.add(this.soignantRepo.getAll()
      .pipe(take(1))
      .subscribe(
        soignants => this.soignants = soignants,
        err => console.error(`Erreur pendant la récupération des soignants`, err)));
  }

  rafraichirDonneesPatient(rdv: Rdv) {
    this.patienRepo.findById(rdv.patient.id)
      .then(patient => {
        // On ne met à jour que si la date de dernière MAJ est différente
        if (rdv.patient.lastUpdate?.getTime() !== patient.lastUpdate?.getTime()) {
          rdv.patient = patient;
          return this.rdvRepo.update(rdv.id, rdv)
        }

        return null;
      })
      .catch(err => console.error(err));
  }

  /**
   * Ajoute les RDV dans les horaires correspondant
   */
  private ajouteRdvsAuxHoraires(rdvs: Rdv[]) {
    rdvs.forEach(rdv => {
      const index = this.horaires.findIndex(horaire => Utils.toHours(horaire.heure) === rdv.date.getHours());
      if (index < 0) {
        this.horaires.unshift(new Horaire(rdv.heure ?? 0, rdv))
      } else if (this.horaires[index].rdvs) {
        this.horaires[index].rdvs.push(rdv);
      } else {
        this.horaires[index].rdvs = [rdv];
      }
    });
  }

  trackByHeure(index: number, h: Horaire): string {
    return h.heureString;
  }

  trackById(index: number, rdv: Rdv): string {
    return rdv.id;
  }

  rdvEdit(rdv: Rdv) {
    this.openRdv.emit(rdv);
  }

  changeDate(incrementor?: number) {
    if (incrementor) {
      this.date.setDate(this.date.getDate() + incrementor);
      this.date = new Date(this.date);
    }
    this.dateSubject.next(this.date);
  }

  changeSoignant(soignant: Soignant) {
    this.soignantSubject.next(soignant);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

}
