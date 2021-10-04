import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PatientService} from "../../repository/patient.service";
import Patient from "../../model/patient";


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patient: Patient;

  constructor(private route: ActivatedRoute, private ps: PatientService) {
  }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.ps.findById(patientId)
      .then(p => this.patient = p)
      .catch(reason => console.log(reason));
  }
}
