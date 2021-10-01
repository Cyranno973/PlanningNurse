import {Component, OnInit} from '@angular/core';
import {InfirmiereService} from "../repository/infirmiere.service";
import Infirmiere from "../model/infirmiere";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-infirmieres',
  templateUrl: './infirmieres.component.html',
  styleUrls: ['./infirmieres.component.scss']
})
export class InfirmieresComponent implements OnInit {
  infirmieres: Infirmiere[];
  display: boolean = false;
  nurseForm: FormGroup;

  constructor(private is: InfirmiereService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.is.getAll().subscribe(data => {
      this.infirmieres = data;
    });
    this.initNurseForm();
  }

  initNurseForm() {
    this.nurseForm = this.formBuilder.group(
      {
        prenom: ['', [Validators.required]],
        nom: ['', [Validators.required]],
        mail: ['', Validators.email],
        pwd: [''],
        tel: [''],
        trg: ['']
      }
    )
  }

  showDialog() {
    this.display = true;
  }

  createTrigramme(nom: string, prenom: string) {
    let trigNom = nom.slice(0, 2) + prenom.slice(0, 1);
    return trigNom;
  }

  onSubmitNurseForm() {
    // this.createTrigramme(this.nurseForm.value.nom, this.nurseForm.value.prenom);
    let nom = this.nurseForm.get('nom').value;
    let prenom = this.nurseForm.get('prenom').value;
    let trigrammes = this.createTrigramme(nom, prenom);
    this.nurseForm.patchValue({
      trg: trigrammes,
    });
    console.log(this.nurseForm.get('trg').value);
    this.is.create(this.nurseForm.value)
  }

  updateNurseForm(nurse: Infirmiere){
  }

  deleteNurse(nurse: Infirmiere){
    this.is.delete(nurse.id);
  }
}
