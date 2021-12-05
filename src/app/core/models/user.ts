import {Roles} from "./roles";
import {AccessUserStorage} from "../../storage/accessUserStorage";
//удалить и нормально подгружать текущую роль
const accessUserStorage: AccessUserStorage = new AccessUserStorage();
export const getUser = () : HasRole => {
  let res : HasRole = {
    role: Roles.Anonymous
  }
  if(accessUserStorage.isPresent()){
    const user = accessUserStorage.get();
    if(user != undefined) {
      res.role = user.role;
    }
  }
  return res;
};

interface HasRole {
  role: Roles;
}


