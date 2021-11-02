import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PatientService} from "../../repository/patient.service";
import {Patient} from "../../model/patient";
import {DialogService} from "primeng/dynamicdialog";
import {FormPatientComponent} from "./form-patient/form-patient.component";
import {Rdv} from "../../model/planning-rdv";
import {PatientRdvsService} from "../../repository/patient-rdvs.service";
import {RdvStatus} from "../../model/enums/rdv-status";
import {FormRdvComponent} from "../../planning/form-rdv/form-rdv.component";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patient: Patient;
  rdvs: Rdv[];
  rdvStatus = RdvStatus;

  constructor(private route: ActivatedRoute,
              private ps: PatientService,
              private prs: PatientRdvsService,
              public dialogService: DialogService) {
  }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    Promise.all([this.ps.findById(patientId), this.prs.findById(patientId, false)])
      .then(p => {
        this.patient = p[0];
        this.rdvs = p[1]?.rdvs;
      }).catch(reason => console.log(reason));
  }

  edit() {
    this.dialogService.open(FormPatientComponent,
      {
        data: {patient: this.patient},
        header: 'Modifier patient',
        dismissableMask: true,
        styleClass: 'custom-modal patient'
      })
      .onClose.subscribe(
      (patient: Patient) => {
        if (patient) this.patient = patient;
      });
  }

  creerRdv() {
    this.dialogService.open(FormRdvComponent, {
      data: {patient: this.patient}, dismissableMask: true,
      header: 'Nouveau RDV', styleClass: 'custom-modal rdv'
    }).onClose
      .pipe(filter(patientRdvs => !!patientRdvs))
      .subscribe((patientRdvs) => this.rdvs = patientRdvs?.rdvs);
  }
}
