import {Injectable} from "@angular/core";
import {Representative} from "../model/customer";

@Injectable()
export class CarService {

  representatives: Representative[];

  getCarsSmall() {
    return this.representatives = [
      {name: "Amy Elsner", image: 'amyelsner.png'},
      {name: "Anna Fali", image: 'annafali.png'},
      {name: "Asiya Javayant", image: 'asiyajavayant.png'},
      {name: "Bernardo Dominic", image: 'bernardodominic.png'},
      {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
      {name: "Ioni Bowcher", image: 'ionibowcher.png'},
      {name: "Ivan Magalhaes", image: 'ivanmagalhaes.png'},
      {name: "Onyama Limba", image: 'onyamalimba.png'},
      {name: "Stephen Shaw", image: 'stephenshaw.png'},
      {name: "XuXue Feng", image: 'xuxuefeng.png'}
    ];
  }
}
