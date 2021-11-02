import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {PatientService} from "../../repository/patient.service";
import {take} from "rxjs/operators";
import {Patient} from "../../model/patient";
import {Soignant} from "../../model/soignant";
import {SoignantService} from "../../repository/soignant.service";
import {FormPatientComponent} from "../../patients/patient/form-patient/form-patient.component";
import {Dropdown} from "primeng/dropdown";
import {Mois, Rdv} from "../../model/planning-rdv";
import {PlanningService} from "../../repository/planning.service";
import {Horaire} from "../../model/horaire";

@Component({
  selector: 'app-form-rdv',
  templateUrl: './form-rdv.component.html',
  styleUrls: ['./form-rdv.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormRdvComponent implements OnInit {

  patient: Patient = this.config.data?.patient;
  rdv: Rdv = this.config.data?.rdv;
  form: FormGroup;
  quiForm: FormGroup;
  quandForm: FormGroup;
  foundPatients: Patient[];
  selectedPatient: Patient;
  selectedDate: Date;
  selectedheure: number;
  soignants: Soignant[];
  proposerNouveau: boolean;
  // Unités de temps en minutes
  serviceDebut: number = 540; // 9h00
  serviceFin: number = 1080; // 18h00
  dureeRdv: number = 20; // en minutes
  horaires: Horaire[] = [];
  creatingPatient: boolean;
  minDate = new Date();
  private patients: Patient[] = [];
  private mois: Mois;

  constructor(private fb: FormBuilder, private config: DynamicDialogConfig,
              private ps: PatientService, private is: SoignantService,
              private rs: PlanningService, private dialogService: DialogService,
              public ref: DynamicDialogRef) {
  }

  ngOnInit(): void {
    this.loadData();
    this.initForms();
    this.computeHoraires();
    this.selectPatient(this.patient)
  }

  private loadData() {
    // Récupère les soignants
    this.is.getAll().pipe(take(1))
      .subscribe(
        soignants => this.soignants = soignants,
        (err) => console.log(`Erreur pendant la récupération des soignants`, err));

    // Récupère le mois en cours
    this.rs.getMois()
      .then(mois => this.mois = mois)
      .catch((err) => console.log(`Erreur pendant la récupération du planning du mois`, err));
  }

  private computeHoraires() {
    for (let h = this.serviceDebut; h < this.serviceFin; h += this.dureeRdv) {
      this.horaires.push(new Horaire(h));
    }
  }

  private initForms() {
    this.quiForm = this.fb.group({
      patient: [{value: null, disabled: this.creatingPatient || this.patient}, Validators.required],
      patientName: [{value: null, disabled: this.creatingPatient || this.patient}],
      soignant: [{value: null, disabled: this.creatingPatient}]
    });

    this.quandForm = this.fb.group({
      jour: [{value: '', disabled: this.creatingPatient}, Validators.required],
      heure: [{value: '', disabled: this.creatingPatient}, Validators.required]
    });

    this.form = this.fb.group({
      qui: this.quiForm,
      quand: this.quandForm
    });
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
    if (!this.patients.length && !this.patient) {
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
    if (!patient) return
    this.selectedPatient = patient;
    this.quiForm.get('patient').setValue(patient);
    this.quiForm.get('patientName').setValue(Patient.fullName(patient));
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

  selectMonth(dateEvent: { month: number, year: number }) {
    this.rs.getMois(`${dateEvent.year}-${dateEvent.month}`)
      .then(mois => this.mois = mois)
      .catch((err) => console.log(`Oups, erreur pendant la récupération du planning du mois`, err));
  }

  selectDay(date: any, htmlElement: HTMLDivElement) {
    if (date instanceof PointerEvent) return;

    if (date instanceof Date) {
      this.selectedDate = date;
      this.quandForm.get('jour').setValue(date);
    } else {
      this.selectedDate = null;
      this.quandForm.get('jour').reset();
    }
    this.scroll(htmlElement);
  }

  selectHour(heure: number) {
    this.selectedheure = heure;
    this.quandForm.get('heure').setValue(heure);
  }

  /**
   * Enregistre un rdv en BDD
   */
  save() {
    const mois = this.mois;
    const jour = this.selectedDate.getDate();
    const soignant = new Soignant(this.quiForm.get('soignant').value);
    const rdv = new Rdv(this.selectedheure, this.selectedPatient, this.selectedDate, soignant);

    if (mois.jours.has(jour)) // Si le mois contient le jour X, on y ajoute le RDV
      mois.jours.get(jour).push(rdv);
    else // Sinon on set le jour avec le premier rdv
      mois.jours.set(jour, [rdv]);

    // Update va enregistrer ou créer le document s'il n'existe pas avec l'id passé
    this.rs.save(mois, rdv).then((rdv) => this.ref.close(rdv[0]))
      .catch((err) => console.log(err));
  }
}
