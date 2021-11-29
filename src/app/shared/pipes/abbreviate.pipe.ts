import {Pipe, PipeTransform} from '@angular/core';
import {Personne} from "../../model/Personne";

@Pipe({
  name: 'abrege'
})
export class AbbreviatePipe implements PipeTransform {

  transform(personne: Personne, ...args: unknown[]): unknown {
    return `${personne.prenom} ${personne.nom[0]}.`;
  }
}
