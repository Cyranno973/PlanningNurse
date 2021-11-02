import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InfirmiereService} from "../../repository/infirmiere.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Infirmiere from "../../model/infirmiere";

@Component({
  selector: 'app-form-infirmiere',
  templateUrl: './form-infirmiere.component.html',
  styleUrls: ['./form-infirmiere.component.scss']
})
export class FormInfirmiereComponent implements OnInit {
  nurseForm: FormGroup;
  infirmiere: Infirmiere = this.config.data;

  constructor(private is: InfirmiereService, private formBuilder: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.initNurseForm();
  }

  initNurseForm() {
    this.nurseForm = this.formBuilder.group(
      {
        prenom: [this.infirmiere?.prenom, [Validators.required]],
        nom: [this.infirmiere?.nom, [Validators.required]],
        mail: [this.infirmiere?.mail, Validators.email],
        pwd: [this.infirmiere?.password],
        tel: [this.infirmiere?.tel],
        trg: [this.infirmiere?.trg]
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
    let save: Promise<Infirmiere>
    let nom = this.nurseForm.get('nom').value;
    let prenom = this.nurseForm.get('prenom').value;
    let trigrammes = this.createTrigramme(nom, prenom);
    this.nurseForm.patchValue({
      trg: trigrammes,
    });
    if (this.infirmiere) save = this.is.update(this.infirmiere.id, this.nurseForm.value);
    else save = this.is.create(this.nurseForm.value);

    save
      .then(i => this.ref.close(i))
      .catch(() => this.ref.close())
  }
}
