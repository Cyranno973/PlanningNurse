import {Pipe, PipeTransform} from '@angular/core';
import {Personne} from "../../model/Personne";

@Pipe({
  name: 'abrege'
})
export class AbbreviatePipe implements PipeTransform {

  transform(personne: Personne, ...args: unknown[]): unknown {
    if (!personne) return '';
    return `${personne.prenom} ${personne.nom[0]}.`;
  }
}
