import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Rdv} from "../../../model/planning-rdv";
import {RdvStatut} from "../../../model/enums/rdv-statut";
import {Patient} from "../../../model/patient";
import {FormRdvComponent} from "../../../planning/form-rdv/form-rdv.component";
import {DialogService} from "primeng/dynamicdialog";
import {PatientRdvsRepository} from "../../../repository/patient-rdvs-repository.service";
import {Subscription} from "rxjs";
import {PlanifUtils} from "../../../shared/PlanifUtils";

@Component({
  selector: 'app-patient-rdvs',
  templateUrl: './patient-rdvs.component.html',
  styleUrls: ['./patient-rdvs.component.scss']
})
export class PatientRdvsComponent implements OnInit, OnDestroy {

  constructor(private patientRdvsRepo: PatientRdvsRepository, private dialogService: DialogService) {
  }

  @Input()
  patient: Patient;
  rdvs: Rdv[] = [];
  rdvStatus = RdvStatut;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.patientRdvsRepo.findById(this.patient.id)
      .then(patientRdvs => this.rdvs = patientRdvs.rdvs)
      .catch(reason => console.log(reason));
  }

  openRdv(rdv?: Rdv) {
    const params = {
      data: {patient: this.patient, rdv: rdv},
      dismissableMask: true,
      header: rdv ? 'Editer RDV' : 'Nouveau RDV',
      styleClass: 'custom-modal rdv'
    };

    this.subscription.add(
      this.dialogService.open(FormRdvComponent, params).onClose
        .subscribe(rdvUpdate => {
          if (rdvUpdate?.deleted) {
            this.rdvs = this.rdvs.filter(r => r.id !== rdv.id);
          } else if (rdvUpdate) {
            const index = this.rdvs.findIndex(r => r.id === rdvUpdate.id);

            if (index < 0) { // Nouveau RDV
              this.rdvs.push(rdvUpdate);
            } else { // Mise à jour
              this.rdvs[index] = rdvUpdate;
            }

            // On réassigne par une copie parce qu'en modifiant directement, le template primeNg ne se met pas à jour :(
            PlanifUtils.trier(this.rdvs, 'date');
            this.rdvs = [...this.rdvs];
          }
        }));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
