import {Roles} from "../../../../core/models/roles";

export interface AccessUser {
  id: number,
  role: Roles,
  token: string
}

