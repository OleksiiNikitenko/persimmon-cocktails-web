import {Roles} from "./roles";
import {AccessUserStorage} from "../../storage/accessUserStorage";

const accessUserStorage: AccessUserStorage = new AccessUserStorage();
export const getUser = (): HasRole => {
  let res: HasRole = {
    role: Roles.Anonymous
  }
  if (accessUserStorage.isPresent()) {
    const user = accessUserStorage.get();
    if (user != undefined) {
      res.role = user.role;
    }
  }
  return res;

};

export const getUserID = accessUserStorage.get()?.id;

interface HasRole {
  role: Roles;
}



