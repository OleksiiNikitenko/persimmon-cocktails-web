import {Component, OnInit} from '@angular/core';
import {CocktailBasicInfo} from "../models/cocktails-basic-info";
import {DataSource} from "@angular/cdk/collections";
import {CocktailsService} from "../services/cocktails.service";
import {MatTableDataSource} from "@angular/material/table";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {columnsToSortBy, Query, ShowActiveMode} from "../models/query";
import {Observable, Subscription} from "rxjs";
import {IngredientName} from "../models/IngredientName";
import {map, startWith} from "rxjs/operators";
import {getUser} from "../../../core/models/user";
import {Roles} from "../../../core/models/roles";
import {CocktailCategory} from "../../cocktail/models/fullCocktail";


@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css', '../../../app.component.css']
})
export class CocktailsComponent implements OnInit {
  // private validationQueryStringPattern: RegExp = /^(?:[a-zA-Z0-9 -]{2,255})$/;
  private subscription: Subscription = new Subscription();
  categories: CocktailCategory[] = [];

  constructor(private cocktailsService: CocktailsService) {
  }

  public currentQuery: Query = {
    query: null,
    page: 0,
    sortByColumn: columnsToSortBy[0],
    sortDirection: true,
    showActiveMode: ShowActiveMode.OnlyActive,
    currentCategory: {categoryId: -1, categoryName: "Doesn't matter"}
  }
  cocktails: CocktailBasicInfo[] = []
  cocktailsDataSource: any;
  cocktailsDisplayedColumns: string[] = ["name", "photoUrl", "receipt", "dishId"
    // "description", "dishType", "dishCategoryName", "labels", "likes", "isActive"
  ];
  searchCocktailsForm: FormGroup | any;
  defaultPhotoUrl: string = "https://www.yahire.com/blogs/wp-content/uploads/2017/04/summer-cocktails.jpg"
  sortColumns: string[] = columnsToSortBy;
  canCreate: boolean = getUser().role === Roles.Moderator || getUser().role === Roles.Admin



  ngOnInit(): void {
    this.searchCocktailsForm = new FormGroup({
      name: new FormControl(''),
      sortColumn: new FormControl(columnsToSortBy),
      sortDirection: new FormControl(true),
      activeMode: new FormControl(this.currentQuery.showActiveMode)
    });
    this.searchCocktailsForm.setValidators(this.searchCocktailsValidator())
    this.getCocktails()
    this.getCategories()
  }

  getCocktails() {
    this.subscription.add(this.cocktailsService.fetchCocktails(this.currentQuery, !this.canCreate)
      .subscribe(cocktails => {
        this.cocktails = cocktails;
        this.cocktailsDataSource = new MatTableDataSource(cocktails)
        // this.cocktailsDataSource
      }))
  }

  checkValue(event: KeyboardEvent) {
    return event.code.match(/^[a-zA-Z0-9 -]*$/) ?
      event.code : event.preventDefault();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  private searchCocktailsValidator() : ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const formGroup : FormGroup = group as FormGroup
      const name = formGroup.controls['name']
      if (name.value != null && name.value.length == 1) {
        name.setErrors({shortLength: true});
      } else {
        name.setErrors(null);
      }
      return name.errors
    };
  }


  displayFn(ingredient?: IngredientName): string | undefined {
    return ingredient ? ingredient.name : undefined;
  }

  private getCategories() {
    this.subscription.add(this.cocktailsService.fetchCocktailCategories().subscribe(
      res => {
        this.categories = res
        this.categories.push({categoryId: -1, categoryName: "Doesn't matter"})
        this.currentQuery.currentCategory = this.categories[this.categories.length-1]
      }, err => {
        console.error(err.error.message)
      }
    ))
  }
}
