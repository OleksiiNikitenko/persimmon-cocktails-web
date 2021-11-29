import {Component, OnInit} from '@angular/core';
import {ADMIN} from "../../../core/models/admin";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../../app.component.css']
})
export class SettingsComponent implements OnInit {

  person = ADMIN;


  constructor() {
  }

  ngOnInit(): void {
  }

}
