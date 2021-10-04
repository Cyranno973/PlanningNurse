import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {FormPatientComponent} from "../patients/patient/form-patient/form-patient.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  plusBtnMenuItems: MenuItem[];

  constructor(public dialogService: DialogService) {
  }

  ngOnInit() {
    this.plusBtnMenuItems = [
      {
        tooltip: 'Créer un patient',
        icon: 'pi pi-user-plus',
        command: () => {
          this.addPatient();
        }
      },
      {
        tooltip: 'Créer un RDV',
        icon: 'pi pi-calendar-plus',
        command: () => {
          // TODO : Create FormRdvComponent
          this.addPatient();
        }
      }
    ]
  }

  private addPatient() {
    this.dialogService.open(FormPatientComponent, {
      header: 'Nouveau patient', styleClass: 'custom-modal patient'
    });
  }
}

