import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Person} from "../model/person";
import {LoginService} from "./login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  registerForm: FormGroup | any;

  public persons: Person[] | undefined;
  public personId: number | any;


  constructor(private personService: LoginService) {
  };


  public login(): void {
    console.log(this.loginForm.value)
    this.personService.login(this.loginForm.value).then(
      (response: Number) => {
        this.personId = response;
        console.log(response);
        console.log(this.loginForm.value)
        this.loginForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ).catch(err => {

    }) ;
  }

  public register(): void
     {console.log(this.registerForm.value)

    this.personService.register(this.registerForm.value).then(
      (response: Number) => {
        this.personId = response;
        console.log(response);
        console.log(this.registerForm.value)
        this.registerForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ).catch(err => {

    }) ;
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email],
      ),
      'password': new FormControl(null,
        [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')])
    });
    this.registerForm = new FormGroup({
      'reg_email': new FormControl(null, [Validators.required, Validators.email],
      ),
      'reg_password': new FormControl(null,
        [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]),
      'reg_name': new FormControl(null, [Validators.required,
        Validators.minLength(3)]),
      'reg_confirm_password': new FormControl(null, [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]
        )
    })
  }





}

