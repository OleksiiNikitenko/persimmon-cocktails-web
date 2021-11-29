import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LocalStorageService} from "../storage/local-storage.service";
import {AccessUserStorage} from "../storage/accessUserStorage";
import {tap} from "rxjs/operators";
import {environment} from "../../environments/environment";


@Injectable()
export class Interceptor implements HttpInterceptor {
  private accessUserStorage: AccessUserStorage = new AccessUserStorage()

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.accessUserStorage.isPresent()) {
      let token = this.accessUserStorage.get()?.token

      //how to update the request Parameters
      const updatedRequest = req.clone({
        headers: req.headers.set("Authorization", "Some-dummyCode")
      });
      //logging the updated Parameters to browser's console
      console.log("Before making api call : ", updatedRequest);
      return next.handle(req).pipe(
        tap(
          event => {
            //logging the http response to browser's console in case of a success
            if (event instanceof HttpResponse) {
              console.log("api call success :", event);
            }
          },
          error => {
            //logging the http response to browser's console in case of a failuer
            if (event instanceof HttpResponse) {
              console.log("api call error :", event);
            }
          }
        )
      );
    } else {
      console.log("authorisation is not added for " + req.url);
      return next.handle(req)
    }
  }

  isOurDomain(req: HttpRequest<any>): boolean {
    return req.url.includes(environment.apiBaseUrl)
  }
}
