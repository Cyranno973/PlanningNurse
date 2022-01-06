import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  @Input()
  piIcone: string;

  @Input()
  linkType: string;

  @Input()
  info: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
