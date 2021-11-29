import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {ActiveKitchenware} from "../models/activeKitchenware";
import {Observable} from "rxjs";
import {KitchenwareView} from "../models/kitchewareview";




@Injectable({
  providedIn: 'root'
})
export class KitchenwareService {
  private apiServerUrl = environment.apiBaseUrl;
  kitchenwareList : Array<KitchenwareView> = []


  constructor(private http: HttpClient) {
  }

  public getAllActiveKitchenware(): Observable<Array<ActiveKitchenware>> {
    return this.http.get<Array<ActiveKitchenware>>(`${this.apiServerUrl}/kitchenware/active`)
  }

  updateAllKitchenware() {
    try {
      this.getAllActiveKitchenware().subscribe(list => {
        this.kitchenwareList = list.map(k => KitchenwareView.fromActiveKitchenwareDto(k));
      })
    }
    catch (err){
      console.error(err)
    }
  }
}
