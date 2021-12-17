import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {URLS} from "../../../core/models/urls";
import {IngredientUiModel} from "../models/ingredient.ui.model";
import {Ingredient} from "../models/ingredient.model";
import {first} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {IngredientsStore} from "./ingredients.store";

class IngredientPhoto {
  ingredientId!: number
  ingredientPhotoId!: number | any
}

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  BASE_URLS = URLS

  constructor(
    private http: HttpClient,
    private store: IngredientsStore
    ) { }

  fetchIngredients() {
    this.http.get<IngredientUiModel[]>(this.BASE_URLS.getIngredients).pipe(
      first()
    ).subscribe((ingredients) => {
      this.store.upsertMany(ingredients)
    })
  }

  createIngredient(data: Ingredient) {
    this.http.post(this.BASE_URLS.addIngredient, data).pipe(first()).subscribe()
  }

  updateIngredient(data: any) {
    this.http.patch(this.BASE_URLS.updateIngredient, data).pipe(first()).subscribe()
  }

  deleteIngredient(data: Ingredient) {
    this.http.patch(this.BASE_URLS.deleteIngredient, data).pipe(first()).subscribe()
  }
  updatePhoto( ingredientId: any, ingredientPhotoId: any){
    this.http.patch(this.BASE_URLS.updateIngredientPhoto, {
      ingredientId: ingredientId,
      ingredientPhotoId: ingredientPhotoId
    } )
      .pipe(
        first()
      ).subscribe(
    {
      next: () => {
        this.store.update(ingredientPhotoId)
      }
    })
  }
}
