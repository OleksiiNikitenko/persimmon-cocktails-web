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
  private apiSearchBaseUrl = `${this.apiServerUrl}/cocktail/active/search`

  constructor(private http: HttpClient) { }

  fetchCocktails(query : Query) : Observable<CocktailBasicInfo[]> {
    const params : HttpParams = this.searchQuery(query)
    console.log(params)
    return this.http.get<CocktailBasicInfo[]>(this.apiSearchBaseUrl, {params})
  }

  searchQuery(query : Query) : HttpParams {
    let params = new HttpParams()
    if(query.query != null && query.query.length>=2){
      params = params.set("search", query.query)
    }
    if(query.sortByColumn != "nothing"){
      params = params.set("sort-by", query.sortByColumn)
      params = params.set("sort-direction", query.sortDirection)
    }
    params = params.set("page", query.page)
    return params
  }
}
