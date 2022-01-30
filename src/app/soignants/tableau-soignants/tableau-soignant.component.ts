import {Component, OnDestroy, OnInit} from '@angular/core';
import {Soignant} from "../../model/soignant";
import {DialogService} from "primeng/dynamicdialog";
import {FormSoignantComponent} from "../form-soignant/form-soignant.component";
import {SoignantRepository} from "../../repository/soignant-repository.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tableau-soignant',
  templateUrl: './tableau-soignant.component.html',
  styleUrls: ['./tableau-soignant.component.scss']
})
export class TableauSoignantComponent implements OnInit, OnDestroy {

  soignants: Soignant[];
  subs: Subscription;

  constructor(private soignantRepo: SoignantRepository, private ds: DialogService) {
  }

  ngOnInit(): void {
    this.subs = this.soignantRepo.getAll().subscribe(soignants => this.soignants = soignants);
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
    this.soignantRepo.delete(nurse.id).catch(err => console.error(err));
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
