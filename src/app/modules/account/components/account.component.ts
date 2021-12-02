import {Component, OnInit} from '@angular/core';
import {ADMIN} from "../../../core/models/admin";
import {Moderator} from "../../moderators/models/moderator.model";
import {ModeratorsMainComponent} from "../../moderators/components/moderators-main/moderators-main.component";
import {AccessUserStorage} from "../../../storage/accessUserStorage";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  // person = ADMIN; //удалить и нормально подгружать текущую роль
  // // moderators = ModeratorsMainComponent().getModerators();
person: any
  constructor(private  accessUserStorage: AccessUserStorage) {
  }

  ngOnInit(): void {
  person:  this.accessUserStorage.get()
  }
}
