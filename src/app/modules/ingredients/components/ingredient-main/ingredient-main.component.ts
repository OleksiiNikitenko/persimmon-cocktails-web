import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {Ingredient} from "../../models/ingredient.model";
import {IngredientsQuery} from "../../services/ingredients.query";
import {IngredientsStore} from "../../services/ingredients.store";
import {IngredientsService} from "../../services/ingredients.service";
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';
import {FormControl, FormGroup} from "@angular/forms";
import {columnsToSortBy, Query} from "../../../stock/models/query";


@UntilDestroy()
@Component({
  selector: 'app-ingredient-main',
  templateUrl: './ingredient-main.component.html',
  styleUrls: ['./ingredient-main.component.css', '../../../../app.component.css']
})
export class IngredientMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'name', 'category', 'editButton', 'statusButton'];
  ingredients: Ingredient[] = [];
  dataSource: any;
  searchIngredientsForm: FormGroup | any;
  public findByNameIngredient: Query = {query: "", page: 0, sortByColumn: "nothing"}

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private ingredientsService: IngredientsService,
              private ingredientsQuery: IngredientsQuery,
              private ingredientsStore: IngredientsStore,
              private cdr: ChangeDetectorRef) {}

  getIngredients(): Ingredient[]{
    return this.ingredients;
  }

  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.ingredientsService.fetchIngredients()
    this.searchIngredientsForm = new FormGroup({
      name: new FormControl(''),
      sortColumn: new FormControl(columnsToSortBy)
    });
    this.ingredientsQuery.selectAll().pipe(
      untilDestroyed(this)
    ).subscribe(ingredients => {
      this.dataSource = new MatTableDataSource(ingredients)
      this.dataSource.sort = this.sort;
      this.cdr.markForCheck()
    })
  }

  checkValue(event: KeyboardEvent) {
    return event.code.match(/^[a-zA-Z0-9 -]*$/) ?
      event.code : event.preventDefault();
  }

  /*deleteIngredient() {
    if (this.form.valid) {
      this.ingredientsService.deleteIngredient(this.form.value)
      this.router.navigate(['ingredients'])
    }
  }*/

  ngAfterViewInit(): void {
  }
}
