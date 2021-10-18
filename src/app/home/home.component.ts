import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {FormPatientComponent} from "../patients/patient/form-patient/form-patient.component";
import {FormRdvComponent} from "../planning/form-rdv/form-rdv.component";
import {Router} from "@angular/router";
import {Patient} from "../model/patient";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  plusBtnMenuItems: MenuItem[];
  private creatingRdv: boolean;
  private creatingPatient: boolean;

  constructor(public dialogService: DialogService, private router: Router) {
  }

  ngOnInit() {
    this.plusBtnMenuItems = [
      {
        tooltipOptions: {
          tooltipLabel: 'Créer un RDV (Alt + r)',
          tooltipPosition: 'left'
        },
        icon: 'pi pi-calendar-plus',
        command: () => {
          this.newRdv();
        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Créer un Patient  (Alt + p)',
          tooltipPosition: 'left'
        },
        icon: 'pi pi-user-plus',
        command: () => {
          this.newPatient();
        }
      }
    ]
  }

  @HostListener('document:keydown.alt.r', ['$event'])
  sortcutsRdv() {
    this.newRdv();
  }

  @HostListener('document:keydown.alt.p', ['$event'])
  sortcutsPatient() {
    this.newPatient();
  }

  private newPatient() {
    if (this.creatingRdv) return;

    this.creatingPatient = true;
    this.dialogService.open(FormPatientComponent, {
      header: 'Nouveau patient', styleClass: 'custom-modal patient'
    }).onClose.subscribe((nouveauPatient: Patient) => {
      this.creatingPatient = false;
      // Si le patient a été créé, on va sur sa page
      if (nouveauPatient) this.router.navigate(['patients/' + nouveauPatient.id]);
    });
  }

  private newRdv() {
    if (this.creatingPatient) return;

    this.creatingRdv = true;
    this.dialogService.open(FormRdvComponent, {
      header: 'Nouveau RDV', styleClass: 'custom-modal rdv'
    }).onClose.subscribe(() => this.creatingRdv = false);
  }
}
