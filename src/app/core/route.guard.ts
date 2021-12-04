import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {of} from "rxjs";
import {routes} from "./models/routes";
import {getUser} from "./models/user";
import {Roles} from "./models/roles";

@Injectable({
  providedIn: 'root'
})
export class CanActivateRoute implements CanActivate {
  private routes = routes
  // private user = getUser()

  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = `/${state.url.split('/')[1]}`

    // @ts-ignore
    return of(routes.find(route => route.url === url).canActivate.includes(getUser().role));
  }
}
