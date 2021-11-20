import {Injectable} from "@angular/core";
import {HttpClient } from "@angular/common/http";
import {URLS} from "../models/urls";
import {ModeratorUIModel} from "../models/moderator.ui.model";
import {ModeratorModel} from "../models/moderator.model";

@Injectable({
  providedIn: 'root'
})
export class ModeratorsService {
  BASE_URLS = URLS

  constructor(
    private http: HttpClient
  ) { }

  fetchModerators() {
    return this.http.get<ModeratorUIModel[]>(this.BASE_URLS.getModerators)
  }

  createModerator(data: ModeratorModel) {
    return this.http.post(this.BASE_URLS.addModerator, data)
  }
}