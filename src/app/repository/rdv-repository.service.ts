import {Injectable} from '@angular/core';
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {Rdv} from "../model/planning-rdv";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {RdvStatutCode} from "../model/enums/rdv-statut";

@Injectable({
  providedIn: 'root'
})
export class RdvRepository extends AbstractCrudRepository<Rdv> {
  constructor(db: AngularFirestore) {
    super(db, '/rdvs');
  }

  // Récupère les rvs d'un soignant par date
  getBySoignantId(soignantId: string, startDate?: Date): Observable<Rdv[]> {
    startDate = startDate ?? new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59);

    return this.db.collection<Rdv[]>(this.dbPath,
      ref => ref
        .where('soignant.id', '==', soignantId)
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
    ).snapshotChanges()
      .pipe(
        map(docChangeAction => docChangeAction
          .flatMap(rdvs => {
            const rdv: Rdv = this.fromFirestore(rdvs.payload.doc.data());
            rdv.id = rdvs.payload.doc.id;
            rdv.fin = new Date(rdv.date.getTime() + rdv.duree * 60000);
            return rdv;
          })
          .filter(rdv => rdv.statut !== RdvStatutCode.ANNULE)
        )
      );
  }
}
