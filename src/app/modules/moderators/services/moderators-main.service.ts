import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { ModeratorModel} from "../models/moderator.model";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ModeratorsMainService{
  private apiServerUrl = environment.apiBaseUrl;
  private moderatorsUrl = `${this.apiServerUrl}/moderator/all`

  constructor(private http: HttpClient){}

  getAllModerators(): Observable<ModeratorModel[]> {
    return this.http.get<ModeratorModel[]>(this.moderatorsUrl);
  }
}
