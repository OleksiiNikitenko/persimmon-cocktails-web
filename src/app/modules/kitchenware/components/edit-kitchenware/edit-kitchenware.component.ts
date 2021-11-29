import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-edit-kitchenware',
  templateUrl: './edit-kitchenware.component.html',
  styleUrls: ['./edit-kitchenware.component.css', '../../../../app.component.css']
})
export class EditKitchenwareComponent implements OnInit {

  form: FormGroup
  selectedFile: File = null as any;


  constructor(
    private formBuilder: FormBuilder, private http: HttpClient
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
