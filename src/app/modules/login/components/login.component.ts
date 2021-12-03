import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Person} from "../model/person";
import {LoginService} from "../services/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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

  constructor(private personService: LoginService, private router: Router,) {
  };

  public login(): void {
    console.log(this.loginForm.value)
    this.personService.login(this.loginForm.value).then(
      (response: Number) => {

        this.personId = response;
        console.log(response);
        this.loginForm.reset();
        // this.router.navigateByUrl('/');
        this.router.navigate(['/blog']);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public register(): void {
    console.log(this.registerForm.value)

    this.personService.register(this.registerForm.value).then(
      (response: Number) => {
        this.personId = response;
        // console.log(response);
        // console.log(this.registerForm.value)
        this.registerForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message)
      }
    );
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required,
        Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$')],
      ),
      'password': new FormControl(null,
        [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')])
    });
    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$')],
      ),
      'password': new FormControl(null,
        [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]),
      'name': new FormControl(null, [Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]{3,255}$')]
      ),
      'confirm_password': new FormControl(null, [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]
      )
    });
  }
}
