import {Component, OnInit} from '@angular/core';

import {user} from "../../../core/models/user";
import {routes} from "../../../core/models/routes";
import {Router} from "@angular/router";
import {ROLE} from "../../login/model/auth/role";
import {AccessUserStorage} from "../../../storage/accessUserStorage";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
   user: any

  public menuItems: Array<{
    text: string,
    url: string,
    isActive: boolean,
    canActivate: (ROLE | undefined)[] ,
  }> = [...routes]

  constructor(private route: Router, public accessUserStorage : AccessUserStorage) { }

  ngOnInit(): void {
    this.navigateHandler(this.route.routerState.snapshot.url)
    this.user= this.accessUserStorage.get()
  }

  navigateHandler(itemUrl: string): void {
    this.menuItems.map(item => {
      item.isActive = item.url === itemUrl;

      return item
    })
  }

}
