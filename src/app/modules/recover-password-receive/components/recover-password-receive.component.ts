import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Person} from "../../login/model/person";
import {HttpErrorResponse} from "@angular/common/http";
import {RecoverPasswordReceiveService} from "../services/recover-password-receive.service";
import {ErrorDialog} from "../../errors-popup/errors-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-recover-password-receive',
  templateUrl: './recover-password-receive.component.html',
  styleUrls: ['./recover-password-receive.component.css']
})
export class RecoverPasswordReceiveComponent implements OnInit {

  id: string | null = null
  nn: string | null = null

  recoverPasswordReceive: FormGroup | any
  public personId: Person | undefined;

  constructor(private route: ActivatedRoute, private recoverPasswordReceiveService: RecoverPasswordReceiveService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.recoverPasswordReceive = new FormGroup({
        'newPassword': new FormControl(null,
          [Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')])
      }
    );
  }


  setNewUserPassword() {
    this.recoverPasswordReceiveService.setNewUserPassword(
      {
        id: this.route.snapshot.paramMap.get('id'),
        personId: this.route.snapshot.paramMap.get('nn'),
        newPassword: this.recoverPasswordReceive.value.newPassword
      }).subscribe(
      (response: Person) => {
        this.personId = response;
        console.log(response);
        this.recoverPasswordReceive.reset();
      },
      (error: HttpErrorResponse) => {
        this.dialog.closeAll()
        this.dialog.open(ErrorDialog, {data: {message: error.error.message} })
      }
    );
  }

}
