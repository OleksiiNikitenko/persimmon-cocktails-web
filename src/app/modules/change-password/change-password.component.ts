import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup | any;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
        'old_password': new FormControl(null,
          [Validators.required]),
        'new_password': new FormControl(null,
          [Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]),
        'confirm_password': new FormControl(null, [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]
        )
      },
    );
  }


  changePassword() {

  }

  openDialog() {
    // this.router.navigate(['/blog']);
    // this.dialog.closeAll()
    this.dialog.open(ChangePasswordComponent, {panelClass: "notSoBad"});
  }
}
