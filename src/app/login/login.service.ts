import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LocalStorageService} from "../local-storage.service";
import {JwtService} from "../jwt.service";
import {RegisterDto, LoginDto} from "../model/auth/Auth";


@Injectable({
  providedIn: 'root'
})
export class LoginService{
  private apiServerUrl = environment.apiBaseUrl;
  private jwtService: JwtService = new JwtService()



  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService){}

  public login(jsonLog: LoginDto): Promise<Number> {

    return this.http.post<any>(`${this.apiServerUrl}/login`, jsonLog, {observe: 'response'}).toPromise().then(res => {
      let token = res.headers.get("Authorization");
      if (token == null) throw null
      let accessUser = this.jwtService.parseAccessUser(token)
      // this.localStorageService.set("jwt_token", token);
      this.localStorageService.set("accessUser", accessUser);
      console.log(this.localStorageService.get("accessUser"))

      return accessUser.id
    });
  }

  public async register(jsonReg: RegisterDto): Promise<Number> {
    return this.http.post<any>(`${this.apiServerUrl}/registration`, jsonReg, {observe: 'response'}).toPromise().then(res => {
      console.log(res.status);

      return this.login({email: jsonReg.email, password: jsonReg.password});
    })


  }

}
