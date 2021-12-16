import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ImageModel} from "../model/image.model";
import {URLS} from "../../../core/models/urls";
@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
urls = URLS

  constructor(private http:HttpClient) { }

  getImageById(imageId: number): Observable<ImageModel> {
    return this.http.get<ImageModel>(this.urls.getImageByIdUrl + imageId);
  }

  upload(file : any):Observable<ImageModel> {
    const formData = new FormData();
    formData.append("image", file);
    return this.http.post<any>( this.urls.uploadImg,
     formData
    )
  }

}
