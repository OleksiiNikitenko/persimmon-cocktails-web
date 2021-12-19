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
import {HttpErrorResponse} from "@angular/common/http";
import {ImageUploadService} from "../../../image/services/image-upload-service";
import {getUser} from "../../../../core/models/user";
import {Roles} from "../../../../core/models/roles";


@UntilDestroy()
@Component({
  selector: 'app-ingredient-main',
  templateUrl: './ingredient-main.component.html',
  styleUrls: ['./ingredient-main.component.css', '../../../../app.component.css']
})
export class IngredientMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'name', 'category', 'dynamicButton', 'statusButton'];
  canEdit: boolean = getUser().role === Roles.Moderator || getUser().role === Roles.Admin
  ingredients: Ingredient[] = [];
  dataSource: any;
  searchIngredientsForm: FormGroup | any;
  public findByNameIngredient: Query = {query: "", page: 0, sortByColumn: "nothing"}
  imagesUrl: string[] = []
  imageNotAvailable = 'https://i.ibb.co/16mJRVD/67eb9e144841.jpg'
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  toggle = true;
  statusBtn:string[] = [];
  status: boolean[] = []
  buttonAddEnabled: boolean[] = []

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private ingredientsService: IngredientsService,
              private ingredientsQuery: IngredientsQuery,
              private ingredientsStore: IngredientsStore,
              private cdr: ChangeDetectorRef,
              private imageService: ImageUploadService) {}


  getIngredients(): Ingredient[]{
    this.handleIngredientStatus(this.ingredients)
    return this.ingredients;
  }

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
        this.ingredients = ingredients
        this.dataSource = new MatTableDataSource(ingredients)
        this.dataSource.sort = this.sort;
        this.cdr.markForCheck()
      console.log(ingredients)
        this.imagesUrl = Array(ingredients.length).fill(this.imageNotAvailable)
        this.setImages(ingredients)
        this.statusBtn=Array(ingredients.length).fill('Enabled')
      this.handleIngredientStatus(ingredients)
      this.buttonAddEnabled = Array(ingredients.length).fill(true);
    })
  }

  checkValue(event: KeyboardEvent) {
    return event.code.match(/^[a-zA-Z0-9 -]*$/) ?
      event.code : event.preventDefault();
  }

  handleIngredientStatus(ingredients :any){
    for (let i = 0; i < this.ingredients.length; i++) {
      if (!this.ingredients[i].active){
        this.statusBtn[i]='Disabled';
      }
      else  this.statusBtn[i]='Enabled';

    }
  }
  getImageByIdIngredients(imageId: number, i: number) {
    if (imageId != null) {
      this.imageService.getImageById(imageId).subscribe(
        (response) => {
          if (response != null)
            this.imagesUrl[i] = response.urlMiddle
          else
            this.imagesUrl[i] = this.imageNotAvailable
        },
        (error: HttpErrorResponse) => {
          // alert(error.error.message);
          throw error;
        }
      );
    }
  }
  setImages(ingredients: any) {
    for (let i = 0; i < ingredients.length; i++) {
      this.getImageByIdIngredients(ingredients[i].photoId, i)
    }
  }
  ngAfterViewInit(): void {
  }

  addToStock(ingredientId : number) {
    this.ingredientsService.addToStock(ingredientId).subscribe((response) => {})
  }

  public changeStatus(ingredientId:number, index: number) {
    console.log(this.ingredients)
    if(this.ingredients.length != 0)
    {
      this.ingredientsService.changeStatus(ingredientId, this.ingredients[index].active)
      // this.toggle = !this.toggle;
      if (this.statusBtn[index]=='Enabled'){
        this.statusBtn[index] ='Disabled'}
      else
        this.statusBtn[index] = 'Enabled';
    }
  }
}

