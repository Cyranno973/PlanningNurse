import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Utils} from "../../shared/Utils";
import {PlanificationMois} from "../../model/planification";
import {PlanificationService} from "../../repository/planification.service";
import {Soignant} from "../../model/soignant";
import {take} from "rxjs/operators";
import {SoignantService} from "../../repository/soignant.service";

@Component({
  selector: 'app-planication',
  templateUrl: './planication.component.html',
  styleUrls: ['./planication.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlanicationComponent implements OnInit {

  currentplanif: PlanificationMois;
  datePlanif = new Date();
  soignants: Soignant[];


  constructor(private planifService: PlanificationService, private ss: SoignantService) {
  }

  ngOnInit(): void {
    // this.loadCurrentPlanification();
    this.loadSoignants();
    const soignant: Soignant = {
      id: 'id',
      trg: 'PNO',
      prenom: 'prenom',
      nom: 'nom'
    };

    this.currentplanif = {
      id: '2022-01',
      periodes: [
        {dates: [new Date(2022, 0, 1), new Date(2022, 0, 15)], soignant},
        {dates: [new Date(2022, 0, 16), new Date(2022, 0, 20)], soignant},
        {dates: [new Date(2022, 0, 21), new Date(2022, 0, 28)], soignant}
      ]
    }
  }

  // Récupère les soignants
  loadSoignants() {
    // S'ils ont déjà été récupérés, on sort
    if (this.soignants?.length) return;

    this.ss.getAll()
      .pipe(take(1))
      .subscribe(
        soignants => this.soignants = soignants,
        err => console.log(`Erreur pendant la récupération des soignants`, err));
  }

  loadCurrentPlanification() {
    this.planifService.findById(Utils.moisFromDate(this.datePlanif), false)
      .then(planif => this.currentplanif = planif)
      .catch(err => console.error(err));
  }

  ajouterLigne() {

  }
}
