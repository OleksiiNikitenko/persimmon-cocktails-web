import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../../login/model/person";


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public changePassword(jsonRecover: object): Observable<Person> {
    return this.http.patch<Person>(`${this.apiServerUrl}/person/change-password`, jsonRecover);
  }
}
