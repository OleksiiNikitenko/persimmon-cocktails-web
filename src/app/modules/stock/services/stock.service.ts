import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockIngredients} from "../models/stock-ingredients";
import {ResponseStockIngredient} from "../models/responseStockIngredient";
import {Query, QueryDelete, QueryUpdate} from "../models/query";
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

  constructor(private http: HttpClient) { }

  fetchStockUpdateIngredient(query : QueryUpdate) {
    const params = this.updateQuery(query)
    console.log(params)
    this.http.patch(this.apiUpdateStock, {params})
  }

  updateQuery(query : QueryUpdate) : HttpParams {
    let params = new HttpParams()
    params = params.set("ingredientId", query.ingredientId)
    params = params.set("amount", query.amount)
    params = params.set("measureType", query.measureType)
    return params;
  }

  fetchDeleteIngredientFromStock(query : QueryDelete) {
    let params = new HttpParams()
    params = params.set("ingredientId", query.ingredientId)
    console.log(params)
    this.http.delete(this.apiDeleteIngredientById+query.ingredientId, {params})
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
  // fetchStock() : Observable<ResponseStockIngredient[]> {
  //   let params : HttpParams = new HttpParams()
  //   params = params.set("page", 0)
  //   return this.http.get<ResponseStockIngredient[]>(this.apiReadStockById, {params})
  // }

  getActualData() : Observable<ResponseStockIngredient> {
    return this.http.get<ResponseStockIngredient>(this.apiReadStockById)
  }

  searchQuery(query : Query) : HttpParams {
    let params = new HttpParams()
    params = params.set("page", query.page)
    return params
  }


}
