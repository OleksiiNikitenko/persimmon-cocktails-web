import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Person} from "../model/person";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  log_email: string | undefined;
  log_password: string | undefined;
  reg_name: string = "";
  reg_email: string = "";
  reg_password: string = "";
  reg_confirm_password: string = "";

  public persons: Person[] | undefined;
  public personId: Person | undefined;
  // public editEmployee: Employee;
  // public deleteEmployee: Employee;

  constructor(private personService: LoginService) {
  };


  public login(): void {
    let person: object = {
      email: this.log_email,
      password: this.log_password
    }
    this.personService.login(person).subscribe(
      (response: Person) => {
        this.personId = response;
        console.log(response);
        this.log_email = "";
        this.log_password = "";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public register(): void {
    let person: object = {
      name: this.reg_name,
      email: this.reg_email,
      password: this.reg_password,
      confirm_password: this.reg_confirm_password
    }
    this.personService.register(person).subscribe(
      (response: Person) => {
        this.personId = response;
        console.log(response);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  ngOnInit(): void {

  }
}

