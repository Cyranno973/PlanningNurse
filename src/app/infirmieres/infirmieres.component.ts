import {Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {FormInfirmiereComponent} from "./form-infirmiere/form-infirmiere.component";

@Component({
  selector: 'app-infirmieres',
  templateUrl: './infirmieres.component.html',
  styleUrls: ['./infirmieres.component.scss']
})
export class InfirmieresComponent implements OnInit {

  constructor(private ds: DialogService) {
  }

  ngOnInit(): void {
  }

  addInfirmiere() {
    this.ds.open(FormInfirmiereComponent, {
      header: 'Ajouter un soignant'
    })
  }
}
