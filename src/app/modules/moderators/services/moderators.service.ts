import {Injectable} from "@angular/core";
import {HttpClient } from "@angular/common/http";
import {URLS} from "../../../core/models/urls";
import {ModeratorUIModel} from "../models/moderator.ui.model";
import {Moderator} from "../models/moderator.model";
import {first} from "rxjs/operators";
import {ModeratorsStore} from "./moderators.store";

@Injectable({
  providedIn: 'root'
})
export class ModeratorsService {
  BASE_URLS = URLS

  constructor(
    private http: HttpClient,
    private store: ModeratorsStore
  ) { }

  fetchModerators() {
    this.http.get<ModeratorUIModel[]>(this.BASE_URLS.getModerators).pipe(
      first()
    ).subscribe((moderators) => {
      this.store.upsertMany(moderators)
    })
  }

  createModerator(data: Moderator) {
    this.http.post(this.BASE_URLS.addModerator, data).pipe(first()).subscribe()
  }

  updateModerator(data: any) {
    this.http.patch(`${this.BASE_URLS.updateModerator}?name=${data.name}`, {}).pipe(first()).subscribe()
  }
}
