import {Component, Input, OnInit} from '@angular/core';
import {Rdv} from "../../../model/planning-rdv";
import {RdvStatut} from "../../../model/enums/rdv-statut";
import {Patient} from "../../../model/patient";
import {FormRdvComponent} from "../../../planning/form-rdv/form-rdv.component";
import {filter} from "rxjs/operators";
import {DialogService} from "primeng/dynamicdialog";
import {PatientRdvsService} from "../../../repository/patient-rdvs.service";

@Component({
  selector: 'app-patient-rdvs',
  templateUrl: './patient-rdvs.component.html',
  styleUrls: ['./patient-rdvs.component.scss']
})
export class PatientRdvsComponent implements OnInit {

  constructor(private prs: PatientRdvsService, private dialogService: DialogService) {
  }

  @Input()
  patient: Patient;
  rdvs: Rdv[];
  rdvStatus = RdvStatut;

  ngOnInit(): void {
    this.prs.findById(this.patient.id)
      .then(patientRdvs => this.rdvs = patientRdvs.rdvs)
      .catch(reason => console.log(reason));
  }

  openRdv(rdv?: Rdv) {
    this.dialogService.open(FormRdvComponent, {
      data: {patient: this.patient, rdv: rdv},
      dismissableMask: true,
      header: rdv ? 'Editer RDV' : 'Nouveau RDV',
      styleClass: 'custom-modal rdv'
    }).onClose
      .pipe(filter(patientRdvs => !!patientRdvs))
      .subscribe((patientRdvs) => this.rdvs = patientRdvs?.rdvs);
  }
}
