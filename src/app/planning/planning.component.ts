import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormRdvComponent} from "./form-rdv/form-rdv.component";
import {Subscription} from "rxjs";
import {Mois, Rdv} from "../model/planning-rdv";
import {DialogService} from "primeng/dynamicdialog";
import {Utils} from "../shared/Utils";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy {

  mois: Mois;
  subs: Subscription;

  constructor(private dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  openRdv(rdv?: Rdv) {
    this.subs = this.dialogService.open(FormRdvComponent, {
      data: {rdv},
      dismissableMask: true,
      header: rdv ? 'Editer RDV' : 'Nouveau RDV',
      styleClass: 'custom-modal rdv'
    }).onClose.subscribe((rdv) => {
      if (rdv?.deleted) {
        Utils.removeRdv(this.mois, rdv);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}

