import {Component, OnInit} from '@angular/core';
import {ADMIN} from "../../../core/models/admin";
import {ChangePasswordComponent} from "../../change-password/change-password.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../../app.component.css'],
  providers: [ChangePasswordComponent]
})
export class SettingsComponent implements OnInit {

  person = ADMIN;


  constructor(public dialogChangePass: ChangePasswordComponent) {
  }

  ngOnInit(): void {
  }

}
