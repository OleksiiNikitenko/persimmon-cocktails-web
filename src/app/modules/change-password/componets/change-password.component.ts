import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Person} from "../../login/model/person";
import {HttpErrorResponse} from "@angular/common/http";
import {ChangePasswordService} from "../services/change-password.service";
import {ErrorDialog} from "../../errors-popup/errors-popup.component";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup | any;
  public personId: Person | undefined;



  constructor(public dialog: MatDialog, private changePasswordService: ChangePasswordService) {
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
        'oldPassword': new FormControl(null,
          [Validators.required]),
        'newPassword': new FormControl(null,
          [Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]),
        'confirmPassword': new FormControl(null, [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]
        )
      },
    );
  }


  changePassword() {
    this.changePasswordService.changePassword({newPassword: this.changePasswordForm.value.newPassword,
      oldPassword: this.changePasswordForm.value.oldPassword}).subscribe(
      (response: Person) => {
        this.personId = response;
        console.log(response);
        this.changePasswordForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.dialog.closeAll()
        this.dialog.open(ErrorDialog, {data: {message: error.error.message} })
      }
    );
  }

  openDialog() {
    // this.router.navigate(['/blog']);
    // this.dialog.closeAll()
    this.dialog.open(ChangePasswordComponent, {panelClass: "notSoBad"});
  }
}
