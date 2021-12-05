import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {CocktailBasicInfo} from "../models/cocktails-basic-info";
import {DataSource} from "@angular/cdk/collections";
import {CocktailsService} from "../services/cocktails.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {
  private validationQueryStringPattern: RegExp = /^(?:[a-zA-Z0-9 -]{2,255})$/;
  constructor(private cocktailsService : CocktailsService) { }

  cocktails : CocktailBasicInfo[] = []
  cocktailsDataSource : any
  currentQueryString: string = ''
  private currentPage: number = 0;
  cocktailsDisplayedColumns: string[] = ["name", "description"];
  searchCocktailsForm: FormGroup | any;


  ngOnInit(): void {
    this.searchCocktailsForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(this.validationQueryStringPattern)])
    });
    this.getCocktails(null)
  }

  getCocktails(currentQueryString : string | null) {
    this.cocktailsService.fetchCocktails({page: this.currentPage, query: currentQueryString})
      .subscribe(cocktails => {
        this.cocktails = cocktails;
        this.cocktailsDataSource = new MatTableDataSource(cocktails)
      })
  }

  checkValue(event: KeyboardEvent) {
    return event.code.match(/^[a-zA-Z0-9 -]*$/) ?
      event.code : event.preventDefault();
  }

  fieldCocktailsChanged(currentQueryString: string) {

  }
}
