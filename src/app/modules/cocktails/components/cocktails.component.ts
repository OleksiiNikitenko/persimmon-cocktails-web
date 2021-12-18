import {Component, OnInit} from '@angular/core';
import {CocktailBasicInfo} from "../models/cocktails-basic-info";
import {CocktailsService} from "../services/cocktails.service";
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subscription} from "rxjs";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, FormBuilder, Validators} from "@angular/forms";
import {columnsToSortBy, Query, ShowActiveMode, specifiedIngredients} from "../models/query";
import {IngredientName} from "../models/IngredientName";
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from "rxjs/operators";
import {getUser} from "../../../core/models/user";
import {Roles} from "../../../core/models/roles";
import {CocktailCategory, SearchCocktailsResponse} from "../../cocktail/models/fullCocktail";


@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css', '../../../app.component.css']
})
export class CocktailsComponent implements OnInit {
  // private validationQueryStringPattern: RegExp = /^(?:[a-zA-Z0-9 -]{2,255})$/;
  private subscription: Subscription = new Subscription();
  public ingredientsControl: FormControl = new FormControl()
  categories: CocktailCategory[] = [];

  filteredOptions: Observable<IngredientName[]>;
  ingredientFormControl: FormControl = new FormControl()
  public ingredientList: { ingredientId: number, name: string }[] = []

  constructor(private cocktailsService: CocktailsService) {
    this.filteredOptions = this.ingredientFormControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => {
          return this.cocktailsService.fetchIngredients(val || '')
        })
      );
  }

  addIngredient() {
    if (this.ingredientList.find(i => i.ingredientId == this.ingredientFormControl.value.ingredientId) == null) {
      this.ingredientList.push(this.ingredientFormControl.value)
      specifiedIngredients.push(this.ingredientFormControl.value.ingredientId)
    }
    this.ingredientFormControl.setValue('')
  }

  displayIngredientName(ingr: IngredientName | null): string {
    if (ingr == null) return ''
    else return ingr.name
  }

  deleteAddedIngredient(ingredientId: number) {
    this.ingredientList = this.ingredientList.filter(i => i.ingredientId != ingredientId)
  }

  public currentQuery: Query = {
    query: null,
    page: 0,
    sortByColumn: columnsToSortBy[0],
    sortDirection: true,
    matchToStock: false,
    searchByListIngredients: specifiedIngredients,
    showActiveMode: ShowActiveMode.OnlyActive,
    currentCategory: {categoryId: -1, categoryName: "Doesn't matter"}
  }
  public previousQuery: Query | null = null

  cocktails: CocktailBasicInfo[] = []
  searchCocktailsForm: FormGroup | any;
  defaultPhotoUrl: string = "https://www.yahire.com/blogs/wp-content/uploads/2017/04/summer-cocktails.jpg"
  sortColumns: string[] = columnsToSortBy;
  canCreate: boolean = getUser().role === Roles.Moderator || getUser().role === Roles.Admin
  amountOfPages: number | null = null;



  ngOnInit(): void {
    this.searchCocktailsForm = new FormGroup({
      name: new FormControl(''),
      sortColumn: new FormControl(columnsToSortBy),
      sortDirection: new FormControl(true),
      matchToStock: new FormControl(false),
      searchByListIngredients: new FormControl(specifiedIngredients),
      activeMode: new FormControl(this.currentQuery.showActiveMode)
    });
    this.searchCocktailsForm.setValidators(this.searchCocktailsValidator())
    this.getCocktails()
    this.getCategories()
  }

  getCocktails() {
    if(this.previousQuery !== null && this.queryHaveChanged(this.previousQuery, this.currentQuery)){
      this.amountOfPages = null
      console.log("Changed query")
    }
    else{
      console.log("Query not changed")
    }
    this.previousQuery = Object.assign({}, this.currentQuery)
    this.subscription.add(this.cocktailsService.fetchCocktails(this.currentQuery, !this.canCreate, this.amountOfPages === null)
      .subscribe((response : SearchCocktailsResponse) => {
        this.cocktails = response.results
        if(response.amountOfPages !== null) this.amountOfPages = response.amountOfPages
      }))
  }

  private queryHaveChanged(previousQuery: Query, currentQuery: Query) : boolean{
    if(previousQuery.query !== currentQuery.query) return true
    if(previousQuery.showActiveMode !== currentQuery.showActiveMode) return true
    if(previousQuery.currentCategory !== currentQuery.currentCategory) return true
    return false
  }

  checkValue(event: KeyboardEvent) {
    return event.code.match(/^[a-zA-Z0-9 -]*$/) ?
      event.code : event.preventDefault();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private searchCocktailsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const formGroup: FormGroup = group as FormGroup
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

  beginPage() {
    this.currentQuery.page = 0
    this.getCocktails()
  }

  setPageDiff(number: number) {
    this.currentQuery.page += number
    this.getCocktails()
  }

  endPage() {
    if(this.amountOfPages !== null){
      this.currentQuery.page = this.amountOfPages-1
      this.getCocktails()
    }
  }
}
