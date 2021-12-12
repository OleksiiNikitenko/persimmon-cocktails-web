import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";

import {User} from "../models/user-model";
import {UserStore} from "./user-store";

@Injectable({
  providedIn: 'root'
})
export class UserQuery extends Query<User| any> {

  constructor(protected store: UserStore) {
    super(store);
  }

}
