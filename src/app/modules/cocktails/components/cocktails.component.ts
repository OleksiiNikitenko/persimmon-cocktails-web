import {Component, OnInit} from '@angular/core';
import {CocktailBasicInfo} from "../models/cocktails-basic-info";
import {DataSource} from "@angular/cdk/collections";
import {CocktailsService} from "../services/cocktails.service";
import {MatTableDataSource} from "@angular/material/table";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {columnsToSortBy, Query} from "../models/query";
import {Observable, Subscription} from "rxjs";
import {IngredientName} from "../models/IngredientName";
import {map, startWith} from "rxjs/operators";


@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css', '../../../app.component.css']
})
export class CocktailsComponent implements OnInit {
  private validationQueryStringPattern: RegExp = /^(?:[a-zA-Z0-9 -]{2,255})$/;
  private subscription: Subscription = new Subscription();
  public ingredientsControl: FormControl = new FormControl()

  constructor(private cocktailsService: CocktailsService) {
  }

  public currentQuery: Query = {
    query: null,
    page: 0,
    sortByColumn: columnsToSortBy[0],
    sortDirection: true,
    matchToStock: false
  }
  cocktails: CocktailBasicInfo[] = []
  cocktailsDataSource: any;
  cocktailsDisplayedColumns: string[] = ["name", "photoUrl", "receipt",
    // "description", "dishType", "dishCategoryName", "labels", "likes", "isActive"
  ];
  searchCocktailsForm: FormGroup | any;
  defaultPhotoUrl: string = "https://www.yahire.com/blogs/wp-content/uploads/2017/04/summer-cocktails.jpg"
  sortColumns: string[] = columnsToSortBy;
  // ingredientIds: number[] = []
  // ingredientsByPrefix?: Observable<IngredientName[]>;


  ngOnInit(): void {
    this.searchCocktailsForm = new FormGroup({
      name: new FormControl(''),
      sortColumn: new FormControl(columnsToSortBy),
      sortDirection: new FormControl(true),
      matchToStock: new FormControl(false),
    });
    this.searchCocktailsForm.setValidators(this.searchCocktailsValidator())
    this.getCocktails()
  }

  getCocktails() {
    this.subscription.add(this.cocktailsService.fetchCocktails(this.currentQuery)
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private searchCocktailsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const formGroup: FormGroup = group as FormGroup
      const name = formGroup.controls['name']
      if (name.value != null && name.value.length <= 2) {
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
}
