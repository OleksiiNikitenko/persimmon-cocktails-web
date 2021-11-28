import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LocalStorageService} from "../local-storage.service";
import {JwtService} from "../jwt.service";


@Injectable({
  providedIn: 'root'
})
export class LoginService{
  private apiServerUrl = environment.apiBaseUrl;
  private jwtService: JwtService = new JwtService()



  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService){}

  public login(jsonLog: object): Promise<Number> {

    return this.http.post<any>(`${this.apiServerUrl}/login`, jsonLog, {observe: 'response'}).toPromise().then(res => {
      let token = res.headers.get("Authorization");
      if (token == null) throw null
      let accessUser = this.jwtService.parseAccessUser(token)
      // this.localStorageService.set("jwt_token", token);
      this.localStorageService.set("accessUser", accessUser);
      console.log(this.localStorageService.get("accessUser"))
      console.log(this.localStorageService.get("jwt_token"))

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
