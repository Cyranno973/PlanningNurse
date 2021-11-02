import {Component, OnInit} from '@angular/core';
import {InfirmiereService} from "../../repository/infirmiere.service";
import Infirmiere from "../../model/infirmiere";
import {DialogService} from "primeng/dynamicdialog";
import {FormInfirmiereComponent} from "../form-infirmiere/form-infirmiere.component";
import {ActivatedRoute, Route} from "@angular/router";

@Component({
  selector: 'app-tableau-infirmieres',
  templateUrl: './tableau-infirmieres.component.html',
  styleUrls: ['./tableau-infirmieres.component.scss']
})
export class TableauInfirmieresComponent implements OnInit {

  infirmieres: Infirmiere[];
  infirmiere: Infirmiere;

  constructor(private is: InfirmiereService, private ds: DialogService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.is.getAll().subscribe(d => this.infirmieres = d);
  }

  updateNurseForm(nurse: Infirmiere) {
    this.ds.open(FormInfirmiereComponent, {
      header: 'Modification Infirmiere',
      data: nurse,
      closable: true,
      styleClass: 'custom-modal patient'
    })
  }

  deleteNurse(nurse: Infirmiere) {
    this.is.delete(nurse.id);
  }

}
