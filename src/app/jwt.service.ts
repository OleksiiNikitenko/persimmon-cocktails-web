import jwt_decode from 'jwt-decode';
import {AccessUser} from "./model/auth/access_user";
import {ROLE} from "./model/auth/role";
import {Authority, JwtPayload} from "./model/auth/jwtPayload"


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

  recogniseRole(array: Array<Authority>): ROLE  {
    for (const authority of array) {
      if (authority.authority == "ROLE_CLIENT") return ROLE.Authorised
      if (authority.authority == "ROLE_MODERATOR") return ROLE.Moderator
      if (authority.authority == "ROLE_ADMIN") return ROLE.Admin
    }
    throw "role is not valid"
  }


}
