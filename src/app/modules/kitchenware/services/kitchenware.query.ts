import {QueryEntity} from "@datorama/akita";
import {KitchenwareStore, KitchenwareStoreState} from "./kitchenware.store";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class KitchenwareQuery extends QueryEntity<KitchenwareStoreState> {
  constructor(
    protected store: KitchenwareStore
  ) {
    super(store);
  }
}
