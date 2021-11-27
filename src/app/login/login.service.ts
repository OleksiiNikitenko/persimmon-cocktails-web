import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LoginService{
  private apiServerUrl = environment.apiBaseUrl;



  constructor(private http: HttpClient){}

  public login(jsonLog: object): Promise<Number> {
    return this.http.post<any>(`${this.apiServerUrl}/login`, jsonLog, {observe: 'response'});
  }

  public async register(jsonReg: object): Promise<Number> {
    return this.http.post<any>(`${this.apiServerUrl}/registration`, jsonReg, {observe: 'response'}).toPromise().then(res => {
      console.log(res.status);
      return this.login(registerRequest :  {email: jsonReg.email, password: jsonReg.password});
    })


  }

}
