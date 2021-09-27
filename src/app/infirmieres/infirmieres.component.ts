import {Component, OnInit} from '@angular/core';
import {InfirmiereService} from "../repository/infirmiere.service";
import {map} from "rxjs/operators";
import Infirmiere from "../model/infirmiere";

@Component({
  selector: 'app-infirmieres',
  templateUrl: './infirmieres.component.html',
  styleUrls: ['./infirmieres.component.scss']
})
export class InfirmieresComponent implements OnInit {
  infirmieres: Infirmiere[];

  constructor(private is: InfirmiereService) {
  }

  ngOnInit(): void {
    this.is.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.infirmieres = data;
    });
  }

}
