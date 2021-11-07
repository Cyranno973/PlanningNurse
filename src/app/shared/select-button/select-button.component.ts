import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HoraireStatut} from "../../model/enums/horaire-statut";

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss']
})
export class SelectButtonComponent {

  @Input()
  value: string;
  @Input()
  selected: boolean;
  @Output()
  onSelectedHour = new EventEmitter<string>();
  @Input()
  statut: HoraireStatut;
  hStatut = HoraireStatut;

  constructor() {
  }
}
