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
    console.log("im here")
    return this.http.post<any>(`${this.apiServerUrl}/login`, jsonLog, {observe: 'response'}).toPromise().then(res => {
      alert(res.headers)
      return 100;
    }).catch(err => {
      console.error(err);
      return 0;
    });
  }

  public async register(jsonReg: object): Promise<Number> {
    return this.http.post<any>(`${this.apiServerUrl}/registration`, jsonReg, {observe: 'response'}).toPromise().then(res => {
      console.log(res.status);
      return this.login(jsonReg);
    })


  }

}
