import {ROLE} from "./role";

export class JwtPayload {
  user_id!: number;
  exp!: any;
  iat!: any;
  sub!: any;
  authorities!: any;
}
