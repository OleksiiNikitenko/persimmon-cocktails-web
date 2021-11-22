import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-kitchenware',
  templateUrl: './add-kitchenware.component.html',
  styleUrls: ['./add-kitchenware.component.css', '../../../../../app.component.css']
})
export class AddKitchenwareComponent implements OnInit {
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
