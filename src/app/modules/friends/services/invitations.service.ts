import {Injectable} from "@angular/core";
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {InviteFriendModel} from "../models/invite-friend.model";
import {RequestFriendshipInvitationDto} from "../models/requestFriendshipInvitation.dto";
// import {RequestOptions} from '@angular/http'

@Injectable({
  providedIn: 'root'
})

export class InvitationsService {
  private apiServerUrl = environment.apiBaseUrl;
  private invitesFiendUrl = `${this.apiServerUrl}/person/friendship-invitations?page=`
  private sendFriendshipInvitationUrl = `${this.apiServerUrl}/person/friend-invitation/add`
  private acceptFriendshipInvitationUrl = `${this.apiServerUrl}/person/friends/add`
  private declineFriendshipInvitationUrl = `${this.apiServerUrl}/person/friendship-invitation/delete`

  constructor(private http: HttpClient) {
  }

  getInvitations(page: number): Observable<InviteFriendModel[]> {
    return this.http.get<InviteFriendModel[]>(this.invitesFiendUrl + page);
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

  acceptInvitation(personId: number){
    return this.http.post<number>(this.acceptFriendshipInvitationUrl, personId);
  }

  declineInvitation(personId: number) {
    const options = {body: {personId: personId}}
    return this.http.delete<number>(this.declineFriendshipInvitationUrl, options);
  }
}
