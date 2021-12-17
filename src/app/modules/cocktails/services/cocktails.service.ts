import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CocktailBasicInfo} from "../models/cocktails-basic-info";
import {Query, ShowActiveMode} from "../models/query";
import {CocktailCategory} from "../../cocktail/models/fullCocktail";

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  private apiServerUrl = environment.apiBaseUrl;
  private apiSearchActiveBaseUrl = `${this.apiServerUrl}/cocktail/active/search`
  private apiSearchBaseUrl = `${this.apiServerUrl}/cocktail/search`
  private apiCategoriesUrl = `${this.apiServerUrl}/cocktail/categories`

  constructor(private http: HttpClient) { }

  fetchCocktails(query : Query, searchActive : boolean) : Observable<CocktailBasicInfo[]> {
    const params : HttpParams = this.searchQuery(query)
    return this.http.get<CocktailBasicInfo[]>(
      searchActive ? this.apiSearchActiveBaseUrl : this.apiSearchBaseUrl,
      {params})
  }

  fetchCocktailCategories() : Observable<CocktailCategory[]>{
    return this.http.get<CocktailCategory[]>(this.apiCategoriesUrl)
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
    let showActive : boolean = query.showActiveMode === ShowActiveMode.OnlyActive || query.showActiveMode === ShowActiveMode.Both
    let showInactive : boolean = query.showActiveMode === ShowActiveMode.OnlyInactive || query.showActiveMode === ShowActiveMode.Both
    params = params.set("show-active", showActive)
    params = params.set("show-inactive", showInactive)
    if(query.currentCategory.categoryId !== -1) params = params.set("dish-category-id", query.currentCategory.categoryId)
    params = params.set("page", query.page)
    return params
  }
}
