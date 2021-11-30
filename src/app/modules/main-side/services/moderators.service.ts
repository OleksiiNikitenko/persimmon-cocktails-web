import {Injectable} from "@angular/core";
import {HttpClient } from "@angular/common/http";
import {URLS} from "../models/urls";
import {ModeratorUIModel} from "../models/moderator.ui.model";
import {ModeratorModel} from "../models/moderator.model";
import {first} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
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

  createModerator(data: ModeratorModel) {
    this.http.post(this.BASE_URLS.addModerator, data).pipe(first()).subscribe()
  }

  updateModerator(data: any) {
    this.http.patch(this.BASE_URLS.updateModerator, data).pipe(first()).subscribe()
  }
}
