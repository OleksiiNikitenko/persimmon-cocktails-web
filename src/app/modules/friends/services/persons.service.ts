import {Injectable} from "@angular/core";
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {FriendModel} from "../models/friend.model";


@Injectable({
  providedIn: 'root'
})

export class PersonsService {
  private apiServerUrl = environment.apiBaseUrl;
  private personsSearchUrl = `${this.apiServerUrl}/person/search/`

  constructor(private http: HttpClient) {
  }

  getPersonsByName(name: string, page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.personsSearchUrl + name + '?page=' + page);
  }
}
