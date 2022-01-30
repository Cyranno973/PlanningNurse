import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PatientRepository} from "../../repository/patient-repository.service";
import {Patient} from "../../model/patient";
import {DialogService} from "primeng/dynamicdialog";
import {FormPatientComponent} from "./form-patient/form-patient.component";
import {Rdv} from "../../model/planning-rdv";
import {RdvStatut} from "../../model/enums/rdv-statut";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit, OnDestroy {
  patient: Patient;
  rdvs: Rdv[];
  rdvStatus = RdvStatut;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private patientRepo: PatientRepository,
              public dialogService: DialogService) {
  }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patientRepo.findById(patientId)
      .then(p => this.patient = p)
      .catch(reason => console.log(reason));
  }

  edit() {
    this.subscription.add(
      this.dialogService.open(FormPatientComponent,
        {
          data: {patient: this.patient},
          header: 'Modifier patient',
          dismissableMask: true,
          styleClass: 'custom-modal patient'
        }).onClose
        .pipe(filter(patient => !!patient))
        .subscribe((patient: Patient) => this.patient = patient)
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
