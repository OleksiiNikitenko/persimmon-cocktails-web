import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {URLS} from "../../../core/models/urls";
import {KitchenwareUiModel} from "../models/kitchenware.ui.model";
import {Kitchenware} from "../models/kitchenware.model";
import {first} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {KitchenwareStore} from "./kitchenware.store";

@Injectable({
  providedIn: 'root'
})
export class KitchenwareService {
  BASE_URLS = URLS

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

  createKitchenware(data: Kitchenware) {
    this.http.post(this.BASE_URLS.addKitchenware, data).pipe(first()).subscribe()
  }

  updateKitchenware(data: any) {
    this.http.patch(this.BASE_URLS.updateKitchenware, data).pipe(first()).subscribe()
  }
}
