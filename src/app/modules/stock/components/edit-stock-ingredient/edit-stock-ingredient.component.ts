import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-stock-ingredient.component.html',
  styleUrls: ['./edit-stock-ingredient.component.css', '../../../../app.component.css']
})
export class EditStockIngredientComponent implements OnInit {

  private _form: FormGroup
  selectedFile: File = null as any;


  constructor(
    private formBuilder: FormBuilder, private http: HttpClient
  ) {
    this._form = this.formBuilder.group({
      name: '',
      amount: '',
      measureType: ''
    })
  }

  ngOnInit(): void {}

  get name() {
    return this._form.get('name')
  }

  get amount() {
    return this._form.get('amount')
  }

  get measureType() {
    return this._form.get('measureType')
  }


  resetFormHandler() {
    this.name?.setValue('')
    this.amount?.setValue('')
  }
}
