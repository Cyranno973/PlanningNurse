import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlContainer, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class SelectButtonComponent {

  @Input()
  value: string;
  @Input()
  selected: boolean;
  @Output()
  onSelectedHour = new EventEmitter<string>();

  constructor() {
  }
}
