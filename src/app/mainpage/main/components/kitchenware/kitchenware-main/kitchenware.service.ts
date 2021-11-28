import {Injectable} from "@angular/core";
import {environment} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {ActiveKitchenware} from "../../../../../model/kitchenware/activeKitchenware";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class KitchenwareService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllActiveKitchenware(): Observable<Array<ActiveKitchenware>> {
    return this.http.get<Array<ActiveKitchenware>>(`${this.apiServerUrl}/kitchenware/active`)
  }


}
