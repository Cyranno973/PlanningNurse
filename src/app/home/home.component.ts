import {Component, OnInit} from '@angular/core';
import {CarService} from "./car.service";
import {Car} from "../model/car";
import {Representative} from "../model/customer";
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  represent: Representative[];

  constructor(private carService: CarService) {
  }

  ngOnInit() {
    this.represent = this.carService.getCarsSmall();
  }
}
