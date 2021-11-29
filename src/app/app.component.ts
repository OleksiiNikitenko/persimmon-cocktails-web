import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActiveKitchenware} from "./model/kitchenware/activeKitchenware";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'persimmon-cocktails';

  // this.http.get<Array<ActiveKitchenware>>(`${this.apiServerUrl}/kitchenware/active`)
  constructor(private _http: HttpClient) {
    _http.get<Array<ActiveKitchenware>>(`http://localhost:8080/kitchenware/active`).
    subscribe(() => {
      console.log('Http Call is success from compoennt');
    }, (error) => {
      console.log('Http Call is failed from component');
    })
  }


}
