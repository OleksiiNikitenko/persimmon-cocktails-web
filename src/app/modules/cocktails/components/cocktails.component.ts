import { Component, OnInit } from '@angular/core';
import {CocktailBasicInfo} from "../models/cocktails-basic-info";
import {DataSource} from "@angular/cdk/collections";
import {CocktailsService} from "../services/cocktails.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {columnsToSortBy, Query} from "../models/query";


@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css', '../../../app.component.css']
})
export class CocktailsComponent implements OnInit {
  private validationQueryStringPattern: RegExp = /^(?:[a-zA-Z0-9 -]{2,255})$/;
  public currentQuery: Query = {query: null, page: 0, sortByColumn: columnsToSortBy[0]}

  constructor(private cocktailsService : CocktailsService) { }

  cocktails : CocktailBasicInfo[] = []
  cocktailsDataSource : any;
  cocktailsDisplayedColumns: string[] = ["name", "photoUrl", "receipt",
    // "description", "dishType", "dishCategoryName", "labels", "likes", "isActive"
  ];
  searchCocktailsForm: FormGroup | any;
  defaultPhotoUrl: string = "https://www.yahire.com/blogs/wp-content/uploads/2017/04/summer-cocktails.jpg"
  sortColumns: string[] = columnsToSortBy;


  ngOnInit(): void {
    this.searchCocktailsForm = new FormGroup({
      name: new FormControl(''),
      sortColumn: new FormControl(columnsToSortBy)
    });
    this.getCocktails()
  }

  getCocktails() {
    this.cocktailsService.fetchCocktails(this.currentQuery)
      .subscribe(cocktails => {
        this.cocktails = cocktails;
        this.cocktailsDataSource = new MatTableDataSource(cocktails)
        // this.cocktailsDataSource
      })
  }

  // private getQuery() {
  //   if()
  // }

  checkValue(event: KeyboardEvent) {
    return event.code.match(/^[a-zA-Z0-9 -]*$/) ?
      event.code : event.preventDefault();
  }

  fieldCocktailsChanged(currentQueryString: string | null) {

  }
}
