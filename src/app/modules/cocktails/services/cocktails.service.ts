import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CocktailBasicInfo} from "../models/cocktails-basic-info";
import {Query} from "../models/query";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  private apiServerUrl = environment.apiBaseUrl;
  private apiSearchBaseUrl = `${this.apiServerUrl}/cocktail/search`

  constructor(private http: HttpClient) { }

  fetchCocktails(query : Query) : Observable<CocktailBasicInfo[]> {
    const params : HttpParams = this.searchQuery(query)
    console.log(params)
    return this.http.get<CocktailBasicInfo[]>(this.apiSearchBaseUrl, {params})
  }

  searchQuery(query : Query) : HttpParams {
    let params = new HttpParams()
    if(query.query != null){
      params = params.set("search", query.query)
    }
    params = params.set("page", query.page)
    return params
  }
}
