import {Pipe, PipeTransform} from '@angular/core';
import {Personne} from "../../model/Personne";

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(personne: Personne, ...args: unknown[]): unknown {
    return `${personne?.prenom} ${personne?.nom?.toUpperCase()}`;
  }

}
