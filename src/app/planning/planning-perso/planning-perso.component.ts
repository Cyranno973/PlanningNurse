import {Component, OnDestroy, OnInit} from '@angular/core';
import {RdvsService} from "../../repository/rdvs.service";
import {Utils} from "../../shared/Utils";
import {Horaire} from "../../model/horaire";
import {Rdv} from "../../model/planning-rdv";
import {RdvStatut} from "../../model/enums/rdv-statut";
import {Subscription} from "rxjs";
import {SoignantService} from "../../repository/soignant.service";

@Component({
  selector: 'app-planning-perso',
  templateUrl: './planning-perso.component.html',
  styleUrls: ['./planning-perso.component.scss']
})
export class PlanningPersoComponent implements OnInit, OnDestroy {

  horaires: Horaire[] = [];
  loading = false;
  rdvStatus = RdvStatut;
  subscriptions: Subscription;

  constructor(private ss: SoignantService, private rs: RdvsService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.horaires = Utils.getHoraires(60);

    // TODO : Récupérer l'id du soignant connecté et remplacer celui-ci en dur qui correspond à FOS
    this.subscriptions = this.rs.getBySoignantId('VEHHVVzuG1sf5osTy5Fs')
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
      if (this.horaires[index].rdvs) {
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

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
