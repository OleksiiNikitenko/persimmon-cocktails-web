import {Injectable} from "@angular/core";
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Person} from "../../login/model/person";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public recover(jsonRecover: object): Observable<Person> {
    return this.http.post<Person>(`${this.apiServerUrl}/forgot-password`, jsonRecover);
  }
}
