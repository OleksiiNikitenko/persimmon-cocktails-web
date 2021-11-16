import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-moderator',
  templateUrl: './add-moderator.component.html',
  styleUrls: ['./add-moderator.component.css', '../../../../../app.component.css']
})
export class AddModeratorComponent implements OnInit {
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
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
}
