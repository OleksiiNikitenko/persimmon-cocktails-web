import {Injectable} from "@angular/core";
import {HttpClient } from "@angular/common/http";
import {URLS} from "../../../core/models/urls";
import {ModeratorUIModel} from "../models/moderator.ui.model";
import {Moderator} from "../models/moderator.model";
import {first} from "rxjs/operators";
import {ModeratorsStore} from "./moderators.store";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialog} from "../../errors-popup/errors-popup.component";

@Injectable({
  providedIn: 'root'
})
export class ModeratorsService {
  BASE_URLS = URLS

  constructor(
    private http: HttpClient,
    private store: ModeratorsStore,
    public dialog: MatDialog
  ) { }

  fetchModerators() {
    this.http.get<ModeratorUIModel[]>(this.BASE_URLS.getModerators).pipe(
      first()
    ).subscribe((moderators) => {
      this.store.upsertMany(moderators)
    }, error => {
      this.dialog.open(ErrorDialog, {data: {message: error.error.message}})
    })
  }

  createModerator(data: Moderator): Observable<any> {
    return this.http.post(this.BASE_URLS.addModerator, data).pipe(first())
  }

  updateModerator(data: any) {
    this.http.patch(this.BASE_URLS.updateModerator, data).pipe(first()).subscribe()
  }
  changeStatus(moderatorId:number){
    this.http.post(this.BASE_URLS.changeStatus,moderatorId).pipe(first()).subscribe()
  }
}
