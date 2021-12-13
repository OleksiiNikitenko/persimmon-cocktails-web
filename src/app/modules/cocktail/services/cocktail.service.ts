import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CocktailCategory, EditCocktail, FullCocktail} from "../models/fullCocktail";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  fetchCocktail(id: number) : Observable<FullCocktail>{
    return this.http.get<FullCocktail>(`${this.apiServerUrl}/cocktail/${id}`)
  }

  fetchActiveCocktail(id: number) : Observable<FullCocktail>{
    return this.http.get<FullCocktail>(`${this.apiServerUrl}/cocktail/active/${id}`)
  }

  likeCocktail(id: number) : Observable<any> {
    return this.http.post<FullCocktail>(`${this.apiServerUrl}/cocktail/like`, id)
  }

  removeIngredient(ingredientId: number, dishId: number) : Observable<any> {
    return this.http.patch(`${this.apiServerUrl}/cocktail/ingredient/remove`, {
      ingredientId: ingredientId,
      cocktailId: dishId
    })
  }

  removeKitchenware(kitchenwareId: any, dishId: number) : Observable<any> {
    return this.http.patch(`${this.apiServerUrl}/cocktail/kitchenware/remove`, {
        kitchenwareId: kitchenwareId,
        cocktailId: dishId
      })
  }

  deleteCocktail(dishId: number) :Observable<any> {
    return this.http.post(`${this.apiServerUrl}/cocktail/delete`, dishId)
  }

  fetchAllCocktailCategories() : Observable<CocktailCategory[]> {
    return this.http.get<CocktailCategory[]>(`${this.apiServerUrl}/cocktail/categories`)
  }

  editCocktail(cocktail: EditCocktail) {
    return this.http.patch(`${this.apiServerUrl}/cocktail/update`, {
      dishId: cocktail.dishId,
      name: cocktail.name,
      description: cocktail.description,
      dishCategoryId: cocktail.dishCategoryId === -1 ? null : cocktail.dishCategoryId,
      receipt: cocktail.receipt,
      isActive: cocktail.isActive,
      labels: cocktail.labels
    })
  }
}
