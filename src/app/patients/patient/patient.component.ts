import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PatientService} from "../../repository/patient.service";
import {Patient} from "../../model/patient";
import {DialogService} from "primeng/dynamicdialog";
import {FormPatientComponent} from "./form-patient/form-patient.component";


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patient: Patient;

  constructor(private route: ActivatedRoute,
              private ps: PatientService,
              public dialogService: DialogService) {
  }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.ps.findById(patientId)
      .then(p => this.patient = p)
      .catch(reason => console.log(reason));
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
}
