import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccessUserStorage} from "../../storage/accessUserStorage";
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {ToolbarComponent} from "../toolbar/components/toolbar.component";


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css', "../../app.component.css"],
  // encapsulation: ViewEncapsulation.None
})
export class LogoutComponent implements OnInit {

  private accessUserStorage: AccessUserStorage = new AccessUserStorage()


  constructor(private router: Router, public dialog: MatDialog,
              private toolbarComponent : ToolbarComponent) {
  }

  ngOnInit(): void {

  }

  exit() {
    console.log(this.accessUserStorage.get())

    this.accessUserStorage.remove()
    this.toolbarComponent.navigateHandler('/cocktails');
    this.router.navigate(['/cocktails'])
    console.log(this.accessUserStorage.get())

    console.log("User logged out")
    this.dialog.closeAll()
    window.location.reload();
  }

  openDialog() {
    this.dialog.open(LogoutComponent, {panelClass: "notSoBad"});
  }
}


