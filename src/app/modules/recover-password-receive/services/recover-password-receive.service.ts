import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../../login/model/person";


@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordReceiveService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public setNewPassword(jsonRecover: object, isModerator: boolean): Observable<Person> {
    if(!isModerator){
      return this.http.post<Person>(`${this.apiServerUrl}/recover-password`, jsonRecover); // /person/change-password
    } else {
      return this.http.post<Person>(`${this.apiServerUrl}/moderator/create-password`, jsonRecover)
    }
  }
}
