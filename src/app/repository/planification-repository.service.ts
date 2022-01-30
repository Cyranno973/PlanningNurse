import {Injectable} from '@angular/core';
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {Planification} from "../model/planification";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, take} from "rxjs/operators";
import {Observable} from "rxjs";
import {PlanifUtils} from "../shared/PlanifUtils";

@Injectable({
  providedIn: 'root'
})
export class PlanificationRepository extends AbstractCrudRepository<Planification> {

  constructor(db: AngularFirestore) {
    super(db, '/planifications');
  }

  // Récupère les rvs d'un soignant par date
  getLast(): Observable<Planification[]> {
    return this.db.collection<Planification[]>(this.dbPath,
      ref => ref
        .limit(15)
        .orderBy('de', 'desc')
    ).snapshotChanges()
      .pipe(
        take(1),
        map(docChangeAction => docChangeAction
          .map(planificationData => {
            const planification: Planification = this.fromFirestore(planificationData.payload.doc.data());
            planification.id = planificationData.payload.doc.id;
            PlanifUtils.computeCurrent(planification);
            return planification;
          })
        )
      );
  }
}
