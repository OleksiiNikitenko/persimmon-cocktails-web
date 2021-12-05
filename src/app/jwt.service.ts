import jwt_decode from 'jwt-decode';
import {AccessUser} from "./modules/login/model/auth/access_user";
import {Authority, JwtPayload} from "./modules/login/model/auth/jwtPayload";
import {Roles} from "./core/models/roles";


export class JwtService{

  constructor() {
  }

  DecodeToken(token: string): JwtPayload {
    return jwt_decode(token);
  }

  parseAccessUser(token: string): AccessUser {
    let payload: JwtPayload = this.DecodeToken(token)
    return {
      id: payload.user_id,
      role: this.recogniseRole(payload.authorities),
      token: token
    };
  }

  recogniseRole(array: Array<Authority>): Roles  {
    for (const authority of array) {
      if (authority.authority == "ROLE_CLIENT") return Roles.User
      if (authority.authority == "ROLE_MODERATOR") return Roles.Moderator
      if (authority.authority == "ROLE_ADMIN") return Roles.Admin
    }
    throw "role is not valid"
  }


}
