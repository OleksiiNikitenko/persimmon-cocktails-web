import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {of} from "rxjs";
import {routes} from "./models/routes";
import {AccessUserStorage} from "../storage/accessUserStorage";

@Injectable({
  providedIn: 'root'
})
export class CanActivateRoute implements CanActivate {
  private routes = routes



  constructor(private accessUserStorage: AccessUserStorage) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = `/${state.url.split('/')[1]}`

    // @ts-ignore
    return of(routes.find(route => route.url === url).canActivate.includes(this.accessUserStorage.get()?.role));
  }
}
