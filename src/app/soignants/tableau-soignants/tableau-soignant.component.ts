import {Component, OnInit} from '@angular/core';
import {Soignant} from "../../model/soignant";
import {DialogService} from "primeng/dynamicdialog";
import {FormSoignantComponent} from "../form-soignant/form-soignant.component";
import {SoignantService} from "../../repository/soignant.service";

@Component({
  selector: 'app-tableau-soignant',
  templateUrl: './tableau-soignant.component.html',
  styleUrls: ['./tableau-soignant.component.scss']
})
export class TableauSoignantComponent implements OnInit {

  soignants: Soignant[];

  constructor(private is: SoignantService, private ds: DialogService) {
  }

  ngOnInit(): void {
    this.is.getAll().subscribe(d => this.soignants = d);
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
    this.is.delete(nurse.id);
  }
}
