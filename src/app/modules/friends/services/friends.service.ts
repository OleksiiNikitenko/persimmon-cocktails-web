import {Injectable} from "@angular/core";
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {FriendModel} from "../models/friend.model";
import {InviteFriendModel} from "../models/invite-friend.model";
import {RequestFriendshipInvitationDto} from "../models/requestFriendshipInvitation.dto";


@Injectable({
  providedIn: 'root'
})

export class FriendsService {
  private apiServerUrl = environment.apiBaseUrl;
  private friendsUrl = `${this.apiServerUrl}/person/friends?page=`
  private friendsSearchUrl = `${this.apiServerUrl}/person/friends/`
  private invitesFiendUrl = `${this.apiServerUrl}/person/friendship-invitations?page=`
  private personsSearchUrl = `${this.apiServerUrl}/person/search/`
  private sendFriendshipInvitationUrl = `${this.apiServerUrl}/person/friend-invitation/add`

  constructor(private http: HttpClient) {
  }

  getFriends(page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.friendsUrl + page);
  }

  getFriendsByName(name: string, page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.friendsSearchUrl + name + '?page=' + page);
  }

  getInvitations(page: number): Observable<InviteFriendModel[]> {
    return this.http.get<InviteFriendModel[]>(this.invitesFiendUrl + page);
  }

  getPersonsByName(name: string, page: number): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(this.personsSearchUrl + name + '?page=' + page);
  }

  sendFriendshipInvitation(personId: number, message: string): Observable<RequestFriendshipInvitationDto> {
    let requestFriendshipInvitation = new RequestFriendshipInvitationDto(personId, message);
    return this.http.post<RequestFriendshipInvitationDto>(this.sendFriendshipInvitationUrl, requestFriendshipInvitation)
    //   .pipe(
    //   catchError((err) => {
    //     console.log('error caught in service')
    //     console.error(err);
    //
    //     //Handle the error here
    //
    //     return throwError(err);    //Rethrow it back to component
    //   })
    // );
  }
}
