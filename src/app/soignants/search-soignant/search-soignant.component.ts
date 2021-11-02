import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {KeyValue} from "@angular/common";
import {Soignant} from "../../model/soignant";
import {Subscription} from "rxjs";
import {SoignantService} from "../../repository/soignant.service";

@Component({
  selector: 'app-search-soignant',
  templateUrl: './search-soignant.component.html',
  styleUrls: ['./search-soignant.component.scss']
})
export class SearchSoignantComponent implements OnInit {

  soignants: Soignant[];
  form: FormGroup;
  searchResults: Soignant[] = [];
  searchFilters: KeyValue<string, string>[] = [];
  subscription: Subscription;

  constructor(private fb: FormBuilder, private is: SoignantService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        nom: [''], prenom: ['']
      }
    );

    this.subscription = this.is.getAll().subscribe(data => {
      this.soignants = data;
    });
  }

  searchString(key: string) {
    this.updateSearchFilters(key);
    this.refreshSearch();
  }

  private updateSearchFilters(key: string) {
    const value = this.form.get(key).value;
    const index = this.searchFilters.findIndex(f => f.key === key);

    if (!!value) {
      index === -1 ? this.searchFilters.push({key, value}) : this.searchFilters[index].value = value;
    } else if (!value && index !== -1) { // Supprime le filtre si vide
      this.searchFilters.splice(index, 1);
    }
  }

  private refreshSearch() {
    // Filtre les infirmiere dont la valeur des champs du formulaire correspondent
    this.searchResults = this.soignants.filter(i =>
      this.searchFilters.every(q => new RegExp(q.value, 'ig').test(i[q.key]))
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
