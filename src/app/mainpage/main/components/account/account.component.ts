import {Component, OnInit} from '@angular/core';
import {ADMIN} from "../../../../core/models/admin";
import {Moderator} from "../../../../core/models/moderator.model";
import {ModeratorsMainComponent} from "../moderators/moderators-main/moderators-main.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  person = ADMIN;
  // moderators = ModeratorsMainComponent().getModerators();

  constructor() {
  }

  ngOnInit(): void {
  }
}
