import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Soignant} from "../../model/soignant";
import {SoignantRepository} from "../../repository/soignant-repository.service";

@Component({
  selector: 'app-form-soignant',
  templateUrl: './form-soignant.component.html',
  styleUrls: ['./form-soignant.component.scss']
})
export class FormSoignantComponent implements OnInit {
  nurseForm: FormGroup;
  soignant: Soignant = this.config.data;

  constructor(private soignantRepo: SoignantRepository, private formBuilder: FormBuilder,
              public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.initNurseForm();
  }

  initNurseForm() {
    this.nurseForm = this.formBuilder.group(
      {
        prenom: [this.soignant?.prenom, [Validators.required]],
        nom: [this.soignant?.nom, [Validators.required]],
        mail: [this.soignant?.mail, Validators.email],
        pwd: [this.soignant?.password],
        tel: [this.soignant?.tel],
        trg: [this.soignant?.trg]
      }
    )
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (['Escape', 'Esc'].includes(event.code)) this.ref?.close()
  }

  private createTrigramme(nom: string, prenom: string) {
    return nom.slice(0, 2) + prenom.slice(0, 1);
  }

  onSubmitNurseForm() {
    let save: Promise<Soignant>
    let nom = this.nurseForm.get('nom').value;
    let prenom = this.nurseForm.get('prenom').value;
    let trigrammes = this.createTrigramme(nom, prenom);
    this.nurseForm.patchValue({
      trg: trigrammes,
    });
    if (this.soignant) save = this.soignantRepo.update(this.soignant.id, this.nurseForm.value);
    else save = this.soignantRepo.create(this.nurseForm.value);

    save
      .then(i => this.ref.close(i))
      .catch(() => this.ref.close())
  }
}
