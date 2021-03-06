import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CocktailBasicInfo} from "../models/cocktails-basic-info";
import {Query, ShowActiveMode} from "../models/query";
import {CocktailCategory, SearchCocktailsResponse} from "../../cocktail/models/fullCocktail";
import {tap} from "rxjs/operators";
import {IngredientName} from "../models/IngredientName";

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  private apiServerUrl = environment.apiBaseUrl;
  private apiSearchActiveBaseUrl = `${this.apiServerUrl}/cocktail/active/search`
  private apiSearchBaseUrl = `${this.apiServerUrl}/cocktail/search`
  private apiCategoriesUrl = `${this.apiServerUrl}/cocktail/categories`

  constructor(private http: HttpClient) { }

  fetchCocktails(query : Query, searchActive : boolean, calculateAmountOfPages : boolean) : Observable<SearchCocktailsResponse> {
    const params : HttpParams = this.searchQuery(query, calculateAmountOfPages)
    return this.http.get<SearchCocktailsResponse>(
      searchActive ? this.apiSearchActiveBaseUrl : this.apiSearchBaseUrl,
      {params})
  }

  fetchCocktailCategories() : Observable<CocktailCategory[]>{
    return this.http.get<CocktailCategory[]>(this.apiCategoriesUrl)
  }

  searchQuery(query: Query, calculateAmountOfPages: boolean) : HttpParams {
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
    if(query.matchToStock){
      params = params.set("show-match-stock", query.matchToStock)
    }
    if(query.searchByListIngredients != null ){
      query.searchByListIngredients.forEach(value => {params = params.append("ingredients", value)})
    }
    params = params.set("page", query.page)
    params = params.set("calculate-pages-amount", calculateAmountOfPages)
    return params
  }

  fetchIngredients(prefix: string | IngredientName, canEdit?: boolean) : Observable<IngredientName[]> {
    if(typeof prefix === 'string') {
      if (prefix.length < 2) return of([])
      const url: string = `${this.apiServerUrl}/ingredient/active/search-by-prefix?prefix=${prefix}`
      return this.http.get<IngredientName[]>(url)
    }
    return of([])
    //   .pipe(
    //   map((ingredients : IngredientName[]) => ingredients.map(i => i.name))
    // )
  }
}
