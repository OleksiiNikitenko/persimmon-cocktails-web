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
  private friendsUrl = `${this.apiServerUrl}/person/17/friends?page=`
  private invitesFiendUrl = `${this.apiServerUrl}/person/17/friends?page=`

  constructor(private http: HttpClient) {
  }

  getFriends(page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.friendsUrl + page);
  }

  getInvitations(page: number): Observable<FriendModel[]> {
    return this.http.get<InviteFriendModel[]>(this.friendsUrl + page);
  }
}
