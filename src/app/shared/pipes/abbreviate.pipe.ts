import {Pipe, PipeTransform} from '@angular/core';
import {Personne} from "../../model/Personne";
import {TitleCasePipe} from "@angular/common";

@Pipe({
  name: 'abrege'
})
export class AbbreviatePipe implements PipeTransform {

  constructor(private titleCase: TitleCasePipe) {
  }

  transform(personne: Personne): string {
    if (!personne) return '';
    return this.titleCase.transform(`${personne.prenom} ${personne.nom[0]}.`);
  }
}
