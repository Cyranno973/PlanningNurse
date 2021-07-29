import {Component, OnInit} from '@angular/core';
import {CarService} from "./car.service";
import {Representative} from "../model/customer";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  represent: Representative[];

  constructor(private carService: CarService) {
  }

  ngOnInit() {
    this.represent = this.carService.getCarsSmall();
  }
}

