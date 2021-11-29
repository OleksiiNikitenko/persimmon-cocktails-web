import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css', '../../../../app.component.css']
})
export class AddIngredientComponent implements OnInit {
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: '',
      category: ''
    })
  }

  ngOnInit(): void {}

  get name() {
    return this.form.get('name')
  }

  get category() {
    return this.form.get('category')
  }

  resetFormHandler() {
    this.name?.setValue('')
    this.category?.setValue('')
  }
}
