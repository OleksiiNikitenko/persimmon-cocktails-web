import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {FriendModel} from "../models/friend.model";
import {FoundUsersModel} from "../models/found-users.model";


@Injectable({
  providedIn: 'root'
})

export class PersonsService {
  private apiServerUrl = environment.apiBaseUrl;
  private personsSearchUrl = `${this.apiServerUrl}/person/search/`
  private personsPagesAmountUrl = `${this.apiServerUrl}/person/search-pages-number/`

  constructor(private http: HttpClient) {
  }

  getPersonsByName(name: string, page: number): Observable<FoundUsersModel[]> {
    return this.http.get<FoundUsersModel[]>(this.personsSearchUrl + name + '?page=' + page);
  }

  getPagesAmount(name: string): Observable<number> {
    return this.http.get<number>(this.personsPagesAmountUrl + name);
  }
}
