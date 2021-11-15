import {Injectable} from "@angular/core";
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Person} from "../model/person";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  //need to fix
  public recover(jsonRecover: string): Observable<Person> {
    return this.http.post<Person>(`${this.apiServerUrl}/recover`, jsonRecover);
  }
}
