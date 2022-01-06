import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {RdvsService} from "../../repository/rdvs.service";
import {Utils} from "../../shared/Utils";
import {Horaire} from "../../model/horaire";
import {Rdv} from "../../model/planning-rdv";
import {RdvStatut} from "../../model/enums/rdv-statut";
import {BehaviorSubject, Subscription} from "rxjs";
import {SoignantService} from "../../repository/soignant.service";
import {switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-planning-perso',
  templateUrl: './planning-perso.component.html',
  styleUrls: ['./planning-perso.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlanningPersoComponent implements OnInit, OnDestroy {
  @Output()
  openRdv = new EventEmitter<Rdv>();
  horaires: Horaire[] = [];
  loading = false;
  rdvStatus = RdvStatut;
  subscriptions: Subscription;
  date: Date = new Date();
  private dateSubject = new BehaviorSubject(this.date);

  constructor(private ss: SoignantService, private rs: RdvsService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.horaires = Utils.getHoraires(60);

    this.dateSubject
      .pipe(
        tap(() => this.loading = true),
        // TODO : Récupérer l'id du soignant connecté et remplacer celui-ci en dur qui correspond à FOS
        switchMap(() => this.rs.getBySoignantId('VEHHVVzuG1sf5osTy5Fs', this.date)),
        tap(() => this.loading = false)
      )
      .subscribe(rdvs => {
        this.horaires.forEach(h => h.resetRdvs());
        this.ajouteRdvsAuxHoraires(rdvs);
      });
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

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
