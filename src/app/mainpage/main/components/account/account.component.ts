import {Component, OnInit} from '@angular/core';
import {ADMIN} from "../../../../core/models/admin";
import {MODERATORS} from "../moderators/mock-moderators";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  person = ADMIN;
  moderators = MODERATORS;

  constructor() {
  }

  ngOnInit(): void {
  }

}
