import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Kitchenware} from "../models/kitchenware.model";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class KitchenwareMainService {
  private apiServerUrl = environment.apiBaseUrl;
  private kitchenwareUrl = `${this.apiServerUrl}/kitchenware/all`

  constructor(private http: HttpClient){}

  getAllIngredients(): Observable<Kitchenware[]> {
    return this.http.get<Kitchenware[]>(this.kitchenwareUrl);
  }
}


