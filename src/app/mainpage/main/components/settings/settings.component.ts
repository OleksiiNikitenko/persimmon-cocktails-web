import { Component, OnInit } from '@angular/core';
import {Person} from "../../Person";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../../../app.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
