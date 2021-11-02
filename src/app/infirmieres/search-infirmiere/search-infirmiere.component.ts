import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {KeyValue} from "@angular/common";
import Infirmiere from "../../model/infirmiere";
import {InfirmiereService} from "../../repository/infirmiere.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-infirmiere',
  templateUrl: './search-infirmiere.component.html',
  styleUrls: ['./search-infirmiere.component.scss']
})
export class SearchInfirmiereComponent implements OnInit {

  infirmieres: Infirmiere[];
  searchInfirmierForm: FormGroup;
  searchResults: Infirmiere[] = [];
  searchFilters: KeyValue<string, string>[] = [];
  subscription: Subscription;

  constructor(private fb: FormBuilder, private is: InfirmiereService) {
  }

  ngOnInit(): void {
    this.searchInfirmierForm = this.fb.group({
        nom: [''], prenom: ['']
      }
    );

    this.subscription = this.is.getAll().subscribe(data => {
      this.infirmieres = data;
    });
  }

  searchString(key: string) {
    this.updateSearchFilters(key);
    this.refreshSearch();
  }

  private updateSearchFilters(key: string) {
    const value = this.searchInfirmierForm.get(key).value;
    const index = this.searchFilters.findIndex(f => f.key === key);

    if (!!value) {
      index === -1 ? this.searchFilters.push({key, value}) : this.searchFilters[index].value = value;
    } else if (!value && index !== -1) { // Supprime le filtre si vide
      this.searchFilters.splice(index, 1);
    }
  }

  private refreshSearch() {
    // Filtre les infirmiere dont la valeur des champs du formulaire correspondent
    this.searchResults = this.infirmieres.filter(i =>
      this.searchFilters.every(q => new RegExp(q.value, 'ig').test(i[q.key]))
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
