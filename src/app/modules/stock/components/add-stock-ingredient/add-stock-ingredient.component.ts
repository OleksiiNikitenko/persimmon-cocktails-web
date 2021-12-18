import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-stock-ingredient',
  templateUrl: './add-stock-ingredient.component.html',
  styleUrls: ['./add-stock-ingredient.component.css', '../../../../app.component.css']
})
export class AddStockIngredientComponent implements OnInit {
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
