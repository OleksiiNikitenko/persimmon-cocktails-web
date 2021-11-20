import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModeratorsService} from "../../../services/moderators.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-moderator',
  templateUrl: './add-moderator.component.html',
  styleUrls: ['./add-moderator.component.css', '../../../../../app.component.css']
})
export class AddModeratorComponent implements OnInit {
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private moderatorsService: ModeratorsService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: false,
    })
  }

  ngOnInit(): void {}

  get name() {
    return this.form.get('name')
  }

  get email() {
    return this.form.get('email')
  }

  get status() {
    return this.form.get('status')
  }

  resetFormHandler() {
    this.name?.setValue('')
    this.email?.setValue('')
    this.status?.setValue(false)
  }

  submitForm() {
    if (this.form.valid) {
      // this.moderatorsService.createModerator(this.form.value).pipe(first()).subscribe()
      this.router.navigate(['moderators'])
    }
  }
}
