import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {StockService} from "../../services/stock.service";
import {QueryUpdate} from "../../models/query";
import {query} from "@angular/animations";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseStockIngredient} from "../../models/responseStockIngredient";
import {StockIngredient} from "../../models/stockIngredient";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-edit-stock-ingredient',
  templateUrl: './edit-stock-ingredient.component.html',
  styleUrls: ['./edit-stock-ingredient.component.css', '../../../../app.component.css']
})
export class EditStockIngredientComponent implements OnInit {

  _form: FormGroup
  selectedFile: File = null as any;
  actualData: ResponseStockIngredient | null = null;
  stockIngredient : StockIngredient | null = null;

  patchQuery: QueryUpdate = {ingredientId: 1, amount: 1, measureType: "l"}

  ingredientId: string | null;

  constructor(
    private router : Router,
    private formBuilder: FormBuilder, private http: HttpClient,
    private  stockService : StockService,
    private route: ActivatedRoute
  ) {
    this.ingredientId =  this.route.snapshot.paramMap.get('ingredientId')
    this._form = this.formBuilder.group({
      amount: this.actualData?.amount,
      measureType: this.actualData?.measureType
    })
    this.stockService.getActualData(this.ingredientId).subscribe(responseStockIngredient => {
      this.actualData = responseStockIngredient
    })
  }

  ngOnInit(): void {}

  // editQuery(query : QueryUpdate) : HttpParams {
  //   let params :  HttpParams = new HttpParams()
  //   params = params.set("ingredientId", )
  // }



  editStockIngredient(): void {

    this.stockService.fetchStockUpdateIngredient(this.patchQuery).subscribe(() => {
      this.router.navigate(["/stock"])

    }, error => {
      this.resetFormHandler()
      console.log(error)
    })

  }

  resetFormHandler() {
    if(this.actualData != null){
      this.actualData.amount = 0
      this.actualData.measureType = ""
    }
  }
}
