import {Component, OnInit} from '@angular/core';
import {Person} from "../model/person";
import {HttpErrorResponse} from "@angular/common/http";
import {RecoverPasswordService} from "./recover-password.service";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  recover_email: string = "";

  public persons: Person[] | undefined;
  public personId: Person | undefined;


  constructor(private personService: RecoverPasswordService) {
  };

  ngOnInit(): void {
  }

  //need to fix
  recover(): void {
    let recoverEmail: string = this.recover_email

    this.personService.recover(recoverEmail).subscribe(
      (response: Person) => {
        this.personId = response;
        console.log(response);
        this.recover_email = "";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
