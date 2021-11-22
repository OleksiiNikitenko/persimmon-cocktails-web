import {Injectable} from "@angular/core";
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {FriendModel} from "../../../../core/models/friend.model";
import {InviteFriendModel} from "../../../../core/models/invite-friend.model";


@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private apiServerUrl = environment.apiBaseUrl;
  private friendsUrl = `${this.apiServerUrl}/person/friends?page=`
  private friendsSearchUrl = `${this.apiServerUrl}/person/friends/`
  private invitesFiendUrl = `${this.apiServerUrl}/person/invites?page=`
  private personsSearchUrl = `${this.apiServerUrl}/person/search/`


  constructor(private http: HttpClient) {
  }

  getFriends(page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.friendsUrl + page);
  }

  getFriendsByName(name: string, page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.friendsSearchUrl + name +'?page=' + page);
  }

  getInvitations(page: number): Observable<InviteFriendModel[]> {
    return this.http.get<InviteFriendModel[]>(this.invitesFiendUrl + page);
  }

  getPersonsByName(name: string, page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.personsSearchUrl + name +'?page=' + page);
  }
}
