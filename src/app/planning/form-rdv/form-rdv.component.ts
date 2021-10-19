import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {PatientService} from "../../repository/patient.service";
import {take} from "rxjs/operators";
import {Patient} from "../../model/patient";
import Infirmiere from "../../model/infirmiere";
import {InfirmiereService} from "../../repository/infirmiere.service";
import {FormPatientComponent} from "../../patients/patient/form-patient/form-patient.component";
import {Dropdown} from "primeng/dropdown";
import {Rdv} from "../../model/planning-mois";
import {PlanningService} from "../../repository/planning.service";

@Component({
  selector: 'app-form-rdv',
  templateUrl: './form-rdv.component.html',
  styleUrls: ['./form-rdv.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormRdvComponent implements OnInit {

  rdv: Rdv = this.config.data?.rdv;
  form: FormGroup;
  quiForm: FormGroup;
  quandForm: FormGroup;
  foundPatients: Patient[];
  selectedPatient: Patient;
  infirmieres: Infirmiere[];
  proposerNouveau: boolean;
  date: Date;
  heure: string;
  // Unités de temps en minutes
  serviceDebut: number = 540; // 9h
  serviceFin: number = 1080; // 18h
  dureeRdv: number = 15;
  creneauxDisplay: string[] = [];
  private creneaux: number[] = [this.serviceDebut];
  private patients: Patient[] = [];
  private creatingPatient: boolean;

  constructor(private fb: FormBuilder, private config: DynamicDialogConfig,
              private ps: PatientService, private is: InfirmiereService,
              private rs: PlanningService, private dialogService: DialogService,
              public ref: DynamicDialogRef) {
  }

  ngOnInit(): void {
    // Récupère les soignants
    this.is.getAll().pipe(take(1)).subscribe(infirmieres => this.infirmieres = infirmieres);
    this.quiForm = this.fb.group({
      patient: [],
      patientName: [],
      infirmiere: []
    });

    this.quandForm = this.fb.group({
      date: ['', Validators.required],
      heure: ['', Validators.required]
    });

    this.form = this.fb.group({
      qui: this.quiForm,
      quand: this.quandForm
    });

    let creneau: number = this.serviceDebut;
    while (creneau < this.serviceFin) {
      creneau = this.creneaux[this.creneaux.length - 1] + this.dureeRdv;
      this.creneaux.push(creneau);
    }

    this.creneauxDisplay = this.creneaux.map(c => FormRdvComponent.toTime(c));
  }

  private static toTime(num): string {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h${minutes ? minutes : '00'}`;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    if (!this.creatingPatient) this.ref?.close();
  }

  searchPatient($event: any) {
    if ($event.query) {
      this.foundPatients = this.patients.filter(p => new RegExp($event.query, 'ig').test(p.nom + p.prenom));
      this.proposerNouveau = !this.foundPatients.length;
    } else {
      this.foundPatients = [];
      this.proposerNouveau = false;
    }
  }

  loadPatients() {
    if (!this.patients.length) {
      this.ps.getAll()
        .pipe(take(1))
        .subscribe(patiens => this.patients = patiens);
    }
  }

  clearSearchPatient() {
    const query: string = this.quiForm.get('patientName').value;
    if (!query) {
      // Si nous ne recevons pas de patient et qu'un patient était déjà sélectionné -> reset
      this.clearPatient();
      // Mais on laisse le texte saisi, sinon tout le texte de l'autocomplete sera supprimé
      this.proposerNouveau = false;
    }
  }

  selectPatient(patient: Patient) {
    this.selectedPatient = patient;
    this.quiForm.get('patient').setValue(patient);
    this.quiForm.get('patientName').setValue(`${patient.prenom} ${patient.nom}`);
    this.proposerNouveau = false;
  }

  clearPatient() {
    this.selectedPatient = null;
    this.quiForm.get('patient').reset();
  }

  newPatient() {
    this.creatingPatient = true;
    this.dialogService.open(FormPatientComponent, {
      header: 'Nouveau patient', styleClass: 'custom-modal patient'
    }).onClose
      .subscribe(nouveauPatient => {
        this.selectPatient(nouveauPatient);
        this.creatingPatient = false
      });
  }

  // Permet de supprimer le contenu d'un dropdown avec la touche Echap sans propager l'event Echap
  // Sinon on ferme la modale
  clearDropdownOnEscape(event: Event, dropdown: Dropdown) {
    if (dropdown.value) {
      dropdown.clear(event);
      event.stopImmediatePropagation();
    }
  }

  scroll(el: HTMLElement) {
    setTimeout(() => el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}), 400);
  }

  resetDate(htmlElement: HTMLDivElement) {
    this.date = null;
    this.quandForm.get('date').reset();
    this.scroll(htmlElement);
  }

  selectDate(date: any, htmlElement: HTMLDivElement) {
    if (date instanceof PointerEvent) return;

    if (date instanceof Date) {
      this.date = date;
      this.quandForm.get('date').setValue(date);
    } else {
      this.resetDate(htmlElement);
    }
    this.scroll(htmlElement);
  }

  selectHeure(creneau: string) {
    this.heure = creneau;
    this.quandForm.get('heure').setValue(creneau);
  }

  save() {
    throw 'A  implémenter';
  }
}
