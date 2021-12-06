import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {ModeratorUIModel} from "../models/moderator.ui.model";
import {Injectable} from "@angular/core";

export interface ModeratorsStoreState extends EntityState<ModeratorUIModel> { }

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'Moderators',
  idKey: 'personId'
})
export class ModeratorsStore extends EntityStore<ModeratorsStoreState> {
  constructor() {
    super();
  }
}
