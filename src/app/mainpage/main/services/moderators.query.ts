import {QueryEntity} from "@datorama/akita";
import {ModeratorsStore, ModeratorsStoreState} from "./moderators.store";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ModeratorsQuery extends QueryEntity<ModeratorsStoreState> {
  constructor(
    protected store: ModeratorsStore
  ) {
    super(store);
  }
}
