import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  log_email: string = "";
  log_password: string = "";
  reg_name: string = "";
  reg_email: string = "";
  reg_password: string = "";
  reg_confirm_password: string = "";



  login() {
    //код входа в аккаунт спритнг
  }

  register() {
    //код регистрации аккаунта

  }
}
