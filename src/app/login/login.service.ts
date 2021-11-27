import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Person} from "../model/person";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class LoginService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public login(jsonLog: object): Observable<Person> {
    return this.http.post<Person>(`${this.apiServerUrl}/login`, jsonLog);
  }

  public register(jsonReg: object): Observable<Person> {
    return this.http.post<Person>(`${this.apiServerUrl}/registration`, jsonReg);
  }

}
