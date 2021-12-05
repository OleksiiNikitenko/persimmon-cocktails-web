import {Component, OnInit} from '@angular/core';
import {Person} from "../../login/model/person";
import {HttpErrorResponse} from "@angular/common/http";
import {RecoverPasswordService} from "../services/recover-password.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  recoverForm: FormGroup | any;

  public persons: Person[] | undefined;
  public personId: Person | undefined;


  constructor(private personService: RecoverPasswordService, public dialog: MatDialog, private router: Router) {
  };

  ngOnInit(): void {
    this.recoverForm = new FormGroup(
      {'recover_email': new FormControl(null, [Validators.required,
          Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$')])});
  }

  recover(): void {
    this.personService.recover(this.recoverForm.value).subscribe(
      (response: Person) => {
        this.personId = response;
        console.log(response);
        this.recoverForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDialog() {
    // this.router.navigate(['/blog']);
    this.dialog.closeAll()
    this.dialog.open(RecoverPasswordComponent, {panelClass: "notSoBad"});
  }
}
