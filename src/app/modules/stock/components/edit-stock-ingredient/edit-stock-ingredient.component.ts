import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {StockService} from "../../services/stock.service";
import {QueryUpdate} from "../../models/query";
import {query} from "@angular/animations";
import {ActivatedRoute} from "@angular/router";
import {ResponseStockIngredient} from "../../models/responseStockIngredient";
import {StockIngredient} from "../../models/stockIngredient";

@Component({
  selector: 'app-edit-stock-ingredient',
  templateUrl: './edit-stock-ingredient.component.html',
  styleUrls: ['./edit-stock-ingredient.component.css', '../../../../app.component.css']
})
export class EditStockIngredientComponent implements OnInit {

  _form: FormGroup
  selectedFile: File = null as any;
  actualData: ResponseStockIngredient | null = null;

  patchQuery: QueryUpdate = {ingredientId: 1, amount: 1, measureType: "l"}

  ingredientId: string | null;

  constructor(
    private formBuilder: FormBuilder, private http: HttpClient,
    private  stockService : StockService,
    private route: ActivatedRoute
  ) {
    this.ingredientId =  this.route.snapshot.paramMap.get('ingredientId')
    this._form = this.formBuilder.group({
      amount: this.actualData?.amount,
      measureType: this.actualData?.measureType
    })
    this.stockService.getActualData().subscribe(responseStockIngredient => {
      this.actualData = responseStockIngredient
    })
  }

  ngOnInit(): void {}

  // editQuery(query : QueryUpdate) : HttpParams {
  //   let params :  HttpParams = new HttpParams()
  //   params = params.set("ingredientId", )
  // }



  // editIngredient(): StockIngredient {
  //   this.stockService.getIngredient()
  // }

  editStockIngredient(): void {
    this.stockService.fetchStockUpdateIngredient(this.patchQuery)
  }

  get id() {
    return this._form.get('id')
  }

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
    this.measureType?.setValue('')
  }
}
