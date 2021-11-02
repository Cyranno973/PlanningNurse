import {Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {FormSoignantComponent} from "./form-soignant/form-soignant.component";

@Component({
  selector: 'app-soignants',
  templateUrl: './soignants.component.html',
  styleUrls: ['./soignants.component.scss']
})
export class SoignantsComponent implements OnInit {

  constructor(private ds: DialogService) {
  }

  ngOnInit(): void {
  }

  addInfirmiere() {
    this.ds.open(FormSoignantComponent, {
      header: 'Ajouter un soignant'
    })
  }
}
