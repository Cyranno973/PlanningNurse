import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Rdv} from "../../../model/planning-rdv";
import {RdvStatut} from "../../../model/enums/rdv-statut";
import {Patient} from "../../../model/patient";
import {FormRdvComponent} from "../../../planning/form-rdv/form-rdv.component";
import {DialogService} from "primeng/dynamicdialog";
import {PatientRdvsService} from "../../../repository/patient-rdvs.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-patient-rdvs',
  templateUrl: './patient-rdvs.component.html',
  styleUrls: ['./patient-rdvs.component.scss']
})
export class PatientRdvsComponent implements OnInit, OnDestroy {

  constructor(private prs: PatientRdvsService, private dialogService: DialogService) {
  }

  @Input()
  patient: Patient;
  rdvs: Rdv[] = [];
  rdvStatus = RdvStatut;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.prs.findById(this.patient.id)
      .then(patientRdvs => this.rdvs = patientRdvs.rdvs)
      .catch(reason => console.log(reason));
  }

  openRdv(rdv?: Rdv) {
    this.subscription.add(
      this.dialogService.open(FormRdvComponent, {
        data: {patient: this.patient, rdv: rdv},
        dismissableMask: true,
        header: rdv ? 'Editer RDV' : 'Nouveau RDV',
        styleClass: 'custom-modal rdv'
      }).onClose.subscribe((rdvUpdate) => {
        if (rdvUpdate?.deleted) {
          this.rdvs = this.rdvs.filter(r => r.id !== rdv.id);
        } else if (rdvUpdate) {
          // S'il n'y avait pas de RDVs avant, c'est un nouveau, on l'ajoute
          if (!this.rdvs?.length) {
            this.rdvs = [rdvUpdate];
          } else {
            // Mise à jour d'un RDV existant => on remplace celui de la liste par l'update
            const rdvsCopy = [...this.rdvs];
            const index = this.rdvs.findIndex(r => r.id === rdvUpdate.id);
            // On crée une copie parce qu'on le modifiant directement, le template primeNg ne se met pas à jour
            rdvsCopy[index] = rdvUpdate;
            this.rdvs = rdvsCopy;
          }
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
