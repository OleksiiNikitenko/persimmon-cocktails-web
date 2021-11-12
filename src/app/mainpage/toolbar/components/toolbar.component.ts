import {Component, OnInit} from '@angular/core';
import {Roles} from "../../../core/models/roles";
import {user} from "../../../core/models/user";
import {routes} from "../../../core/models/routes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user = user

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
      if (item.url !== itemUrl) {
        item.isActive = false
      } else {
        item.isActive = true
      }

      return item
    })
  }

}
