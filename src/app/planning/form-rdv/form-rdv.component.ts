import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
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
import {RdvStatut} from "../../model/enums/rdv-statut";
import {Utils} from "../../shared/Utils";
import {HoraireStatut} from "../../model/enums/horaire-statut";
import {FullNamePipe} from "../../shared/pipes/full-name.pipe";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-rdv',
  templateUrl: './form-rdv.component.html',
  styleUrls: ['./form-rdv.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormRdvComponent implements OnInit, OnDestroy {
  patient: Patient = this.config.data?.patient;
  rdv: Rdv = this.config.data?.rdv;
  form: FormGroup;
  quiForm: FormGroup;
  quandForm: FormGroup;
  foundPatients: Patient[];
  selectedPatient: Patient;
  selectedSoignant: Soignant;
  date: Date;
  heure: number;
  duree: number = 30; // minutes
  soignants: Soignant[] = [];
  proposerNouveau: boolean;
  horaires: Horaire[] = [];
  creatingPatient: boolean;
  minDate = new Date();
  selectedStep = 0;
  rdvStatus = RdvStatut;
  private patients: Patient[] = [];
  private mois: Mois;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private config: DynamicDialogConfig,
              private ps: PatientService, private is: SoignantService,
              private rs: PlanningService, private dialogService: DialogService,
              public ref: DynamicDialogRef, private pipefullName: FullNamePipe) {
  }

  ngOnInit(): void {
    this.loadData();
    this.initForms();
    this.selectPatient(this.patient ?? this.rdv?.patient)
    if (this.rdv?.soignant || this.patient?.soignant)
      this.soignants.push(this.rdv?.soignant ?? this.patient?.soignant);

    if (this.rdv) {
      this.selectMonth({year: this.rdv.date.getFullYear(), month: this.rdv.date.getMonth() + 1})
        .then(() => {
          this.selectDay(new Date(this.rdv.date), null, false);
          this.selectHour(this.rdv.heure, false);
          this.selectSoigant()
          this.quandForm.get('date').setValue(this.rdv.date);
        });
      this.selectedStep = 2;
    } else {
      this.selectSoigant();
    }
  }

  private loadData() {
    this.horaires = Utils.getHoraires(this.duree);
    // Récupère le mois en cours
    this.rs.getMois()
      .then(mois => this.mois = mois)
      .catch((err) => console.log(`Erreur pendant la récupération du planning du mois`, err));
  }

  loadSoignants() {
    // Récupère les soignants
    this.subscription.add(
      this.is.getAll().pipe(take(1))
        .subscribe(
          soignants => this.soignants = soignants,
          err => console.log(`Erreur pendant la récupération des soignants`, err)));
  }

  private initForms() {
    this.quiForm = this.fb.group({
      patient: [{value: this.rdv?.patient, disabled: this.creatingPatient || this.patient}, Validators.required],
      patientName: [{value: this.pipefullName.transform(this.rdv?.patient), disabled: this.creatingPatient || this.patient}],
      soignant: [{value: this.rdv?.soignant ?? this.patient?.soignant, disabled: this.creatingPatient}]
    });

    this.quandForm = this.fb.group({
      date: [{value: '', disabled: this.creatingPatient}, Validators.required],
      jour: [{value: '', disabled: this.creatingPatient}, Validators.required],
      heure: [{value: '', disabled: this.creatingPatient}, Validators.required],
      status: [{value: RdvStatut[this.rdv?.statut] ?? RdvStatut.SOUHAITE, disabled: this.creatingPatient}, Validators.required]
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
      this.subscription.add(this.ps.getAll()
        .pipe(take(1))
        .subscribe(patiens => this.patients = patiens));
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
    this.quiForm.get('patientName').setValue(this.pipefullName.transform(patient));
    this.proposerNouveau = false;
  }

  clearPatient() {
    this.selectedPatient = null;
    this.quiForm.get('patient').reset();
  }

  newPatient() {
    this.creatingPatient = true;
    this.subscription.add(this.dialogService.open(FormPatientComponent, {
      header: 'Nouveau patient', styleClass: 'custom-modal patient'
    }).onClose
      .subscribe(nouveauPatient => {
        this.selectPatient(nouveauPatient);
        this.creatingPatient = false
      }));
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
    return this.rs.getMois(`${dateEvent.year}-${dateEvent.month}`)
      .then(mois => this.mois = mois)
      .catch((err) => console.log(`Oups, erreur pendant la récupération du planning du mois`, err));
  }

  private calculeDispos(soignant: Soignant = this.quiForm.get('soignant').value) {
    const jour = this.date.getDate();

    // Disponibilité des horaires
    if (soignant && jour && this.mois && this.mois.jours?.has(jour)) {
      const rdvsSoignant = this.mois.jours.get(jour).filter(r => r.soignant?.id === soignant?.id);

      this.horaires.forEach(h => {
        const rdv = rdvsSoignant.find(r => r.heure === h.heure);
        h.statut = HoraireStatut.fromRdvStatut(rdv?.statut);
      });

    } else {
      // TODO : le cas des disponibilité de toute les soignants
      this.horaires.forEach(r => r.statut = HoraireStatut.DISPONIBLE);
    }

  }

  selectDay(date: any, htmlElement?: HTMLDivElement, touched: boolean = true) {
    if (date instanceof PointerEvent) return;

    if (date instanceof Date) {
      this.date = date;
      this.quandForm.get('jour').setValue(date);
      this.calculeDispos();
    } else {
      this.date = null;
      this.quandForm.get('jour').reset();
    }

    this.heure = null;
    this.quandForm.get('heure').reset();

    if (htmlElement) this.scroll(htmlElement);
    if (touched) this.quandForm.markAsTouched();
  }

  selectHour(heure: number, touched: boolean = true) {
    this.heure = heure;
    // pour que le pipe 'date' du template se mette à jour
    // lors du changement de l'heure, on re-set la date
    this.date = new Date(this.date);
    this.date.setHours(Utils.toHours(heure), Utils.toMinutes(heure));
    this.quandForm.get('heure').setValue(heure);
    if (touched) this.quandForm.markAsTouched();
  }

  /**
   * Enregistre un rdv en BDD
   */
  save() {
    const mois = this.mois;
    const jour = this.date.getDate();
    const soignant = new Soignant(this.quiForm.get('soignant').value);
    const status = this.quandForm.get('status').value as RdvStatut;
    const rdv = new Rdv(this.rdv?.id, this.heure, this.selectedPatient, this.date, this.duree, soignant, status.code);

    // Si le mois contient le jour X, on y ajoute le RDV
    if (mois.jours.has(jour)) {
      const index = mois.jours.get(jour).findIndex(r => r.id === rdv.id);

      // Met à jour le RDV dans la journée ou l'ajoute s'il n'existe pas
      if (index > -1) {
        mois.jours.get(jour)[index] = rdv;
      } else {
        mois.jours.get(jour).push(rdv);
      }
    } else { // Sinon on set le jour avec le premier rdv
      mois.jours.set(jour, [rdv]);
    }

    // Si le rdv existait, on le supprime si nécessaire du jour où il était planifié
    const isSameMonth = Mois.fromDate(this.rdv?.date) === mois.id;
    if (this.rdv && isSameMonth && this.rdv.date.getDate() !== rdv.date.getDate()) {
      Utils.removeRdv(mois, this.rdv);
    }

    // Update va enregistrer ou créer le document s'il n'existe pas avec l'id passé
    this.rs.save(mois, rdv)
      .then(prdvs => {
          this.removeFromMonth(rdv);
          this.ref.close(prdvs);
        }
      ).catch((err) => console.log(err));
  }

  // Si le mois est différent, on le retire de là où il était avant
  private removeFromMonth(rdv: Rdv) {
    let moisDifferent = Mois.fromDate(this.rdv?.date) !== Mois.fromDate(rdv.date);
    if (this.rdv && moisDifferent) {
      this.rs.getMois(Mois.fromDate(this.rdv?.date))
        .then(mois => {
          Utils.removeRdv(mois, this.rdv);
          this.rs.update(mois.id, mois).then(() => this.ref.close(rdv));
        });
    }
  }

  selectSoigant($event?: { value: Soignant }) {
    const soignant = $event?.value ?? this.rdv?.soignant ?? this.patient?.soignant;
    this.selectedSoignant = soignant;
    if (this.selectedPatient && soignant) {
      this.selectedStep = !this.rdv ? 1 : 2;
    }
  }

  trackByHeure(index: number, h: Horaire): string {
    return h.heureString;
  }

  delete() {
    this.rs.deleteRdv(this.rdv)
      .then(() => this.ref.close({deleted: true, ...this.rdv}))
      .catch((err) => console.log(err));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
