import {Component, OnInit} from '@angular/core';
import {RdvsService} from "../../repository/rdvs.service";
import {Utils} from "../../shared/Utils";
import {Horaire} from "../../model/horaire";
import {Rdv} from "../../model/planning-rdv";

@Component({
  selector: 'app-planning-perso',
  templateUrl: './planning-perso.component.html',
  styleUrls: ['./planning-perso.component.scss']
})
export class PlanningPersoComponent implements OnInit {

  horaires: Horaire[];
  rdvs: Rdv[];
  loading = false;

  constructor(private rs: RdvsService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.horaires = Utils.getHoraires(60);
    this.rs.getByTrigrammeSoignant('FoS')
      .subscribe(rdvs => {
        this.rdvs = rdvs;
        this.matchHoraires();
      });

  }

  private matchHoraires() {
    // Caser les RDV dans les horaires correspondant
    this.rdvs.forEach(rdv => {
      // Compute height
      const index = this.horaires.findIndex(horaire => Utils.toHours(horaire.heure) === rdv.date.getHours());
      if (this.horaires[index].rdvs) {
        this.horaires[index].rdvs.push(rdv);
      } else {
        this.horaires[index].rdvs = [rdv];
      }
    });
  }
}
