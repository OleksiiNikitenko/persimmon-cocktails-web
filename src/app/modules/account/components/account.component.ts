import {Component, OnInit} from '@angular/core';
import {ADMIN} from "../../../core/models/admin";
import {AccessUserStorage} from "../../../storage/accessUserStorage";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  person = ADMIN; //удалить и нормально подгружать текущую роль
  // moderators = ModeratorsMainComponent().getModerators();



  constructor() {
  }

  ngOnInit(): void {

  }
}
