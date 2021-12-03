import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {FriendModel} from "../models/friend.model";


@Injectable({
  providedIn: 'root'
})

export class PersonsService {
  private apiServerUrl = environment.apiBaseUrl;
  private personsSearchUrl = `${this.apiServerUrl}/person/search/`
  private personsPagesAmountUrl = `${this.apiServerUrl}/person/search-pages-number/`

  constructor(private http: HttpClient) {
  }

  getPersonsByName(name: string, page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.personsSearchUrl + name + '?page=' + page);
  }

  getPagesAmount(name: string): Observable<number> {
    return this.http.get<number>(this.personsPagesAmountUrl + name);
  }
}
