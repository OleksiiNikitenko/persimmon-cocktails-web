import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {KitchenwareUiModel} from "../models/kitchenware.ui.model";
import {Injectable} from "@angular/core";

export interface KitchenwareStoreState extends EntityState<KitchenwareUiModel> { }

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'IKitchenware',
  idKey: 'kitchenwareId'
})
export class KitchenwareStore extends EntityStore<KitchenwareStoreState> {
  constructor() {
    super();
  }
}
