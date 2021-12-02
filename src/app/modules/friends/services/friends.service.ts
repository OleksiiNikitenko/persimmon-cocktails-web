import {Injectable} from "@angular/core";
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {FriendModel} from "../models/friend.model";


@Injectable({
  providedIn: 'root'
})

export class FriendsService {
  private apiServerUrl = environment.apiBaseUrl;
  private friendsUrl = `${this.apiServerUrl}/person/friends?page=`
  private friendsSearchUrl = `${this.apiServerUrl}/person/friends/`

  constructor(private http: HttpClient) {
  }

  getFriends(page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.friendsUrl + page);
  }

  getFriendsByName(name: string, page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.friendsSearchUrl + name + '?page=' + page);
  }
}
