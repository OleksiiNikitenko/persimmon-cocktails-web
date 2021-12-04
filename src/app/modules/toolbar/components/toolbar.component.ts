import {Component, Injectable, OnInit} from '@angular/core';
import {Roles} from "../../../core/models/roles";
import {getUser} from "../../../core/models/user";
import {routes} from "../../../core/models/routes";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public menuItems: Array<{
    text: string,
    url: string,
    isActive: boolean,
    canActivate: Roles[],
  }> = [...routes]

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.navigateHandler(this.route.routerState.snapshot.url)
  }

  navigateHandler(itemUrl: string): void {
    this.menuItems.map(item => {
      item.isActive = item.url === itemUrl;

      return item
    })
  }

  getUser() {
    return getUser()
  }
}
