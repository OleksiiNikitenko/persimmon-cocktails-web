import {Injectable} from "@angular/core";
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {FriendModel} from "../models/friend.model";


@Injectable({
  providedIn: 'root'
})

export class MainService {
  checkValue(event: any) {
    return String.fromCharCode(event.charCode).match(/^[a-zA-Z0-9 ]*$/) ?
      event.CharCode : event.preventDefault();
  }

  getDifferenceInDays(date: Date): number {
    let today = new Date()
    console.log(date)
    console.log(typeof date)
    console.log(typeof today)
    console.log(date.getTime())
    const diffInMs = Math.abs(today.getTime() - date.getTime());
    return diffInMs / (1000 * 60 * 60 * 24);
  }
}
