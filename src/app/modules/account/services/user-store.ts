import { Store, StoreConfig } from '@datorama/akita';
import {Injectable} from "@angular/core";

import {User} from "../models/user-model";

export function createInitialState(): User {
  return {
    personId: -1,
    name: '',
    email: '',
    photoId: -1,
    blogId: -1,
    roleId: -1,
    isActive: false
  }
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'user' })
export class UserStore extends Store<User> {
  constructor() {
    super(createInitialState());
  }
}
