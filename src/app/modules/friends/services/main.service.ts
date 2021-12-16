import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class MainService {

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


}
