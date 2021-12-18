import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class MainService {

  constructor() {
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
