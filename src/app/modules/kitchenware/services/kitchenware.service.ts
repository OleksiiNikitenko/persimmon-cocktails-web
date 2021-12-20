import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {URLS} from "../../../core/models/urls";
import {KitchenwareUiModel} from "../models/kitchenware.ui.model";
import {Kitchenware, KitchenwareRequest} from "../models/kitchenware.model";
import {first} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {KitchenwareStore} from "./kitchenware.store";
import {Observable} from "rxjs";
import {KitchenwareIdModel} from "../models/kitchenwareId.model";
import {environment} from "../../../../environments/environment";

class IngredientPhoto {
  kitchenwareId!: number
  kitchenwarePhotoId!: number | any
}

@Injectable({
  providedIn: 'root'
})
export class KitchenwareService {
  BASE_URLS = URLS

  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private store: KitchenwareStore
  ) { }

  fetchKitchenware() {
    this.http.get<KitchenwareUiModel[]>(this.BASE_URLS.getKitchenware).pipe(
      first()
    ).subscribe((kitchenware) => {
      this.store.upsertMany(kitchenware)
    })
  }

  createKitchenware(data: KitchenwareRequest): Observable<any> {
    return this.http.post(this.BASE_URLS.addKitchenware, data).pipe(first())
  }

  updateKitchenware(data: any) {
    this.http.patch(this.BASE_URLS.updateKitchenware, data).pipe(first()).subscribe()
  }

  searchKitchenware(name: string): Observable<Kitchenware[]> {
    return this.http.get<Kitchenware[]>(this.BASE_URLS.searchKitchenware + "?prefix=" + name);
  }

  changeStatus(kitchenwareId:number, isActive: boolean){
    if(isActive)
      return this.http.patch(this.BASE_URLS.deactivateKitchenware + kitchenwareId, {})
    else
      return this.http.patch(this.BASE_URLS.activateKitchenware + kitchenwareId, {})
  }
  updatePhoto( kitchenwareId: any, kitchenwarePhotoId: any){
    this.http.patch(this.BASE_URLS.updateKitchenwarePhoto, {
      kitchenwareId: kitchenwareId,
      kitchenwarePhotoId: kitchenwarePhotoId
    } )
      .pipe(
        first()
      ).subscribe(
      {
        next: () => {
          this.store.update(kitchenwarePhotoId)
        }
      })
  }

}
