import {Injectable} from '@angular/core';
import {Soignant} from "../model/soignant";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SoignantService extends AbstractCrudRepository<Soignant> {
  private MAX_TIME_CACHE = 300000; // millisecondes (300000 => 5 minutes)
  private cache$: Observable<Soignant[]>;
  private cacheDate: Date;

  constructor(db: AngularFirestore) {
    super(db, '/infirmieres');
  }

  getAll(): Observable<Soignant[]> {
    const date = new Date();
    const cacheExpired = date.getTime() - this.cacheDate?.getTime() >= this.MAX_TIME_CACHE;

    if (!this.cache$ || cacheExpired) {
      // Met en cache et replay le dernier résultat (1) pour les nouveaux subscribers
      this.cache$ = super.getAll().pipe(shareReplay(1));
      this.cacheDate = date;
    }

    return this.cache$;
  }
}
