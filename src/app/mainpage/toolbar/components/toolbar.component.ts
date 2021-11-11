import {Component, OnInit} from '@angular/core';
import {Roles} from "../../../core/models/roles";
import {user} from "../../../core/models/user";
import {routes} from "../../../core/models/routes";

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
  constructor() { }

  ngOnInit(): void { }

  navigateHandler(itemText: string): void {
    this.menuItems.map(item => {
      if (item.text !== itemText) {
        item.isActive = false
      } else {
        item.isActive = true
      }

      return item
    })
  }

}
