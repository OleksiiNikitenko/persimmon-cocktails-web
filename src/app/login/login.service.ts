import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LocalStorageService} from "../storage/local-storage.service";
import {JwtService} from "../jwt.service";
import {RegisterDto, LoginDto} from "../model/auth/Auth";
import {AccessUserStorage} from "../storage/accessUserStorage";


@Injectable({
  providedIn: 'root'
})
export class LoginService{
  private apiServerUrl = environment.apiBaseUrl;
  private jwtService: JwtService = new JwtService()
  private accessUserStorage: AccessUserStorage = new AccessUserStorage()




  constructor(private http: HttpClient){}

  public login(jsonLog: LoginDto): Promise<Number> {

    return this.http.post<any>(`${this.apiServerUrl}/login`, jsonLog, {observe: 'response'}).toPromise().then(res => {
      let token = res.headers.get("Authorization");
      if (token == null) throw null
      let accessUser = this.jwtService.parseAccessUser(token)
      // this.localStorageService.set("jwt_token", token);
      this.accessUserStorage.set(accessUser);
      console.log(this.accessUserStorage.get())

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
