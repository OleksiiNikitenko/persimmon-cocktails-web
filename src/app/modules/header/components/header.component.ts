import { Component, OnInit } from '@angular/core';
import {LogoutComponent} from '../../logout/logout.component';
import {LoginComponent} from "../../login/components/login.component";
import {getUser} from "../../../core/models/user";
import {Roles} from "../../../core/models/roles";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../app.component.css'],
  providers: [LogoutComponent, LoginComponent]
})
export class HeaderComponent implements OnInit {

  constructor(public dialogLogOut: LogoutComponent, public dialogAuth: LoginComponent) { }

  ngOnInit(): void {
  }

  isNotAuthenticated() : boolean {
    return getUser().role == Roles.Anonymous
  }
}
