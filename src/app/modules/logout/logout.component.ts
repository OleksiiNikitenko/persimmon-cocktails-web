import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccessUserStorage} from "../../storage/accessUserStorage";
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css', "../../app.component.css"],
  // encapsulation: ViewEncapsulation.None
})
export class LogoutComponent implements OnInit {

  private accessUserStorage: AccessUserStorage = new AccessUserStorage()


  constructor(private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  exit() {
    console.log(this.accessUserStorage.get())

    this.accessUserStorage.remove()
    this.router.navigate(['/blog'])
    console.log(this.accessUserStorage.get())

    console.log("User logged out")
  }

  openDialog() {
    this.dialog.open(LogoutComponent, {panelClass: "notSoBad"});
  }
}


