import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {FriendModel} from "../models/friend.model";


@Injectable({
  providedIn: 'root'
})

export class FriendsService {
  private apiServerUrl = environment.apiBaseUrl;
  private friendsSearchUrl = `${this.apiServerUrl}/person/friends/`
  private friendsPagesAmountUrl = `${this.apiServerUrl}/person/friends-pages-number`
  private deleteFriendUrl = `${this.apiServerUrl}/person/friends/delete`

  constructor(private http: HttpClient) {
  }

  getFriends(page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.friendsSearchUrl + '?page=' + page);
  }

  getFriendsByName(name: string, page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.friendsSearchUrl + name + '?page=' + page);
  }

  getPagesAmount(name: string): Observable<number> {
    if (name == "") {
      return this.http.get<number>(this.friendsPagesAmountUrl);
    } else return this.http.get<number>(this.friendsPagesAmountUrl + "/" + name);
  }

  deleteFriend(personId: number) {
    const options = {body: {personId: personId}}
    return this.http.delete<number>(this.deleteFriendUrl, options);
  }
}
