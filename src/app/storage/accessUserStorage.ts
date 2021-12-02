import {LocalStorageService} from "./local-storage.service";
import {AccessUser} from "../modules/login/model/auth/access_user";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class AccessUserStorage extends LocalStorageService<AccessUser>{

  private key: string = "accessUser"

  get(): AccessUser | null {
    return super.getItem(this.key);
  }

  set(value: AccessUser): boolean {
    return super.setItem(this.key, value);
  }

  remove(): boolean {
    return super.removeItem(this.key);
  }

  isPresent(): boolean {
    return super.isPresent(this.key);
  }
}
