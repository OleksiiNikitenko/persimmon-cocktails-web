import {ROLE} from "./role";

export interface AccessUser {
  id: number,
  role: ROLE,
  token: string
}

