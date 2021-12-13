import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {IngredientUiModel} from "../models/ingredient.ui.model";
import {Injectable} from "@angular/core";

export interface IngredientsStoreState extends EntityState<IngredientUiModel> { }

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'Ingredients',
  idKey: 'ingredientId'
})
export class IngredientsStore extends EntityStore<IngredientsStoreState> {
  constructor() {
    super();
  }
}
