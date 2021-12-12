import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {FullCocktail} from "../models/fullCocktail";
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
}
