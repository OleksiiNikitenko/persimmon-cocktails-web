import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {FoundUsersModel} from "../models/found-users.model";
import {URLS} from "../../../core/models/urls";


@Injectable({
  providedIn: 'root'
})

export class PersonsService {
  urls =URLS

  constructor(private http: HttpClient) {
  }

  getPersonsByName(name: string, page: number): Observable<FoundUsersModel[]> {
    return this.http.get<FoundUsersModel[]>(this.urls.personsSearchUrl + name + '?page=' + page);
  }

  getPagesAmount(name: string): Observable<number> {
    return this.http.get<number>(this.urls.personsPagesAmountUrl + name);
  }
}
