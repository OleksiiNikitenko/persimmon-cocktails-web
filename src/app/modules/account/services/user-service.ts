import {Injectable} from "@angular/core";
import {URLS} from "../../../core/models/urls";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs/operators";
import {UserStore} from "./user-store";
import {User} from "../models/user-model";

import {getUserID} from "../../../core/models/user";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    private userStore: UserStore,
  ) {
  }

  BASE_URLS = URLS

 public getPersonById() {
   this.http.get<User>(`${this.BASE_URLS.personGetUrl}${getUserID}`
   ).pipe(
     first()
   ).subscribe(user => this.userStore.update(user))
  }


  updateUserName(data: any) {
    this.http.put(`${this.BASE_URLS.updateUserName}?name=${data.name}`, {})
      .pipe(
        first()
      ).subscribe({
      next: () => {
        this.userStore.update(data)
      }
    })
  }

}
