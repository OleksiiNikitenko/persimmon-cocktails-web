import { Component, OnInit } from '@angular/core';
import {UserService} from "../../account/services/user-service";

@Component({
  selector: 'app-main-side',
  templateUrl: './main-side.component.html',
  styleUrls: ['./main-side.component.css']
})
export class MainSideComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getPersonById()
  }

}
