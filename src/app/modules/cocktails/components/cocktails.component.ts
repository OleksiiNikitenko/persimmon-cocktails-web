import { Component, OnInit } from '@angular/core';
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
  cocktailsDisplayedColumns: string[] = ["name", "photoUrl", "receipt",
    // "description", "dishType", "dishCategoryName", "labels", "likes", "isActive"
  ];
  searchCocktailsForm: FormGroup | any;
  defaultPhotoUrl: string = "https://www.yahire.com/blogs/wp-content/uploads/2017/04/summer-cocktails.jpg"


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
