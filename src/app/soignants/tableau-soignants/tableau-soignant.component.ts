import {Component, OnDestroy, OnInit} from '@angular/core';
import {Soignant} from "../../model/soignant";
import {DialogService} from "primeng/dynamicdialog";
import {FormSoignantComponent} from "../form-soignant/form-soignant.component";
import {SoignantService} from "../../repository/soignant.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tableau-soignant',
  templateUrl: './tableau-soignant.component.html',
  styleUrls: ['./tableau-soignant.component.scss']
})
export class TableauSoignantComponent implements OnInit, OnDestroy {

  soignants: Soignant[];
  subs: Subscription;

  constructor(private ss: SoignantService, private ds: DialogService) {
  }

  ngOnInit(): void {
    this.subs = this.ss.getAll().subscribe(soignants => this.soignants = soignants);
  }

  addInfirmiere() {
    this.ds.open(FormSoignantComponent, {
      header: 'Ajouter un soignant',
      dismissableMask: true,
      styleClass: 'custom-modal soignant'
    })
  }

  updateNurseForm(nurse: Soignant) {
    this.ds.open(FormSoignantComponent, {
      header: 'Modification soignant',
      data: nurse,
      closable: true,
      styleClass: 'custom-modal soignant'
    })
  }

  deleteNurse(nurse: Soignant) {
    this.ss.delete(nurse.id).catch(err => console.error(err));
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
