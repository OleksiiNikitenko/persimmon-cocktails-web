import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ImageModel} from "../models/image.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class MainService {
  private apiServerUrl = environment.apiBaseUrl;
  private getImageByIdUrl = `${this.apiServerUrl}/image/get/`

  constructor(private http: HttpClient) {
  }

  checkValue(event: any) {
    return String.fromCharCode(event.charCode).match(/^[a-zA-Z0-9 ]*$/) ?
      event.CharCode : event.preventDefault();
  }

  getDifferenceInDays(date: Date): number {
    let today = new Date()
    const diffInMs = Math.abs(today.getTime() - date.getTime());
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  getImageById(imageId: number): Observable<ImageModel> {
    return this.http.get<ImageModel>(this.getImageByIdUrl + imageId);
  }
}
