import {Component, OnInit} from '@angular/core';
import {Person} from "../../login/model/person";
import {HttpErrorResponse} from "@angular/common/http";
import {RecoverPasswordService} from "../services/recover-password.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  recoverForm: FormGroup | any;

  public persons: Person[] | undefined;
  public personId: Person | undefined;


  constructor(private personService: RecoverPasswordService) {
  };

  ngOnInit(): void {
    this.recoverForm = new FormGroup(
      {'recover_email': new FormControl(null, [Validators.required, Validators.email])});
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
}
