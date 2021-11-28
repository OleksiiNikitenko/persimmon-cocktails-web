import {Injectable, NgModule} from "@angular/core";
import jwt_decode from 'jwt-decode';
import {AccessUser} from "./model/access_user";
import {ROLE} from "./model/role";
import {JwtPayload} from "./model/jwtPayload"


export class JwtService{

  constructor() {
  }

  DecodeToken(token: string): string {
    return jwt_decode(token);
  }

  parseAccessUser(token: string): AccessUser {
    let string: string = this.DecodeToken(token)
    console.log(string)
    let payload: JwtPayload = JSON.parse(string)
    let accessUser: AccessUser = {
      id: payload.user_id,
      role: ROLE.Admin,
      token: token
    }


    // parseInt(payload.user_id)
    return accessUser;
  }

}
