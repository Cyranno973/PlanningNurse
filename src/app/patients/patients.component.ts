import {Component, OnInit} from '@angular/core';
import {PatientService} from "../repository/patient.service";
import Patient from "../model/patient";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients: Patient[];

  constructor(private ps: PatientService) {
  }

  ngOnInit(): void {
    this.ps.getAll().subscribe(data => {
      this.patients = data;
    });
  }

}
