import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockIngredients} from "../models/stock-ingredients";
import {StockIngredient} from "../models/stockIngredient";
import {ResponseStockIngredient} from "../models/responseStockIngredient";
import {Query, QueryDelete} from "../models/query";
import {tap} from "rxjs/operators";
import {CocktailBasicInfo} from "../../cocktails/models/cocktails-basic-info";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiServerUrl = environment.apiBaseUrl;
  private apiSearchIngredientsByName = `${this.apiServerUrl}/stock/search/`

  private apiReadStockById = `${this.apiServerUrl}/stock/getPersonalStock`
  private apiDeleteIngredientById = `${this.apiServerUrl}/stock/`   //+Path variable
  private apiUpdateStock = `${this.apiServerUrl}/stock/update-stock`
  private apiAddIngredient = `${this.apiServerUrl}/stock/add-ingredient`
  private apiReadStockIngredientById = `${this.apiServerUrl}/stock/getPersonalStockIngredient/`

  constructor(private http: HttpClient) { }

  fetchStockUpdateIngredient(stockIngredient: StockIngredient) : Observable<any> {
    return this.http.patch(this.apiUpdateStock, stockIngredient)
  }

  fetchDeleteIngredientFromStock(ingredientId : number) {
    return this.http.delete(this.apiDeleteIngredientById+ingredientId)
  }

  fetchStockIngredientsByName(query : Query) : Observable<StockIngredients[]> {
    const params : HttpParams = this.searchQuery(query)
    console.log(params)
    return this.http.get<StockIngredients[]>(this.apiSearchIngredientsByName+query.query, {params})
  }

  fetchStock() : Observable<StockIngredients[]> {
    let params : HttpParams = new HttpParams()
    params = params.set("page", 0)
    return this.http.get<StockIngredients[]>(this.apiReadStockById, {params})
  }

  getActualData(ingredientId : string | null) : Observable<ResponseStockIngredient> {
    return this.http.get<ResponseStockIngredient>(this.apiReadStockIngredientById+ingredientId)
  }

  searchQuery(query : Query) : HttpParams {
    let params = new HttpParams()
    params = params.set("page", query.page)
    return params
  }

}
