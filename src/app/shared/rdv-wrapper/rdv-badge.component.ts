import {Component, Input} from '@angular/core';
import {Rdv} from "../../model/planning-rdv";

@Component({
  selector: 'rdv-badge',
  templateUrl: './rdv-badge.component.html',
  styleUrls: ['./rdv-badge.component.scss']
})
export class RdvBadgeComponent {

  @Input()
  rdv: Rdv;
}
