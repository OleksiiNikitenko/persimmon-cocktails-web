import {QueryEntity} from "@datorama/akita";
import {IngredientsStore, IngredientsStoreState} from "./ingredients.store";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class IngredientsQuery extends QueryEntity<IngredientsStoreState> {
  constructor(
    protected store: IngredientsStore
  ) {
    super(store);
  }
}
