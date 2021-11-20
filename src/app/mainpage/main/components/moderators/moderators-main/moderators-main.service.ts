import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Moderator} from "../Moderator";
import {environment} from "../../../../../../environments/environment";
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ModeratorsMainService{
  private apiServerUrl = environment.apiBaseUrl;
  private moderatorsUrl = `${this.apiServerUrl}/moderator/all`

  constructor(private http: HttpClient){}

  getAllModerators(): Observable<Moderator[]> {
    return this.http.get<Moderator[]>(this.moderatorsUrl);
  }
}
