import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Ingredient} from "../models/ingredient.model";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class IngredientsMainService{
  private apiServerUrl = environment.apiBaseUrl;
  private ingredientsUrl = `${this.apiServerUrl}/ingredient/all`

  constructor(private http: HttpClient){}

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl);
  }
}


