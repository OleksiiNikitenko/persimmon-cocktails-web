import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {StockService} from "../../services/stock.service";
import {query} from "@angular/animations";
import {ActivatedRoute, Router} from "@angular/router";
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
  dataSource: any;

  patchQuery: StockIngredient = {ingredientId: 1, amount: 1, measureType: "", imageUrl: "https://media.timeout.com/images/105631937/image.jpg"}
  defaultPhotoUrl: string = "https://media.timeout.com/images/105631937/image.jpg"
  ingredientId: string | null;

  constructor(
    private router : Router,
    private formBuilder: FormBuilder, private http: HttpClient,
    private  stockService : StockService,
    private route: ActivatedRoute
  ) {
    this._form = new FormGroup ({
      amount: new FormControl(this.actualData?.amount),
      measureType: new FormControl(this.actualData?.measureType),
    });
    this.ingredientId =  this.route.snapshot.paramMap.get('ingredientId')
    this._form = this.formBuilder.group({
      amount: this.actualData?.amount,
      measureType: this.actualData?.measureType,
    })
    this.stockService.getActualData(this.ingredientId).subscribe(responseStockIngredient => {
      this.actualData = responseStockIngredient
      this.patchQuery.amount = this.actualData.amount
      this.patchQuery.measureType = this.actualData.measureType
      this.patchQuery.ingredientId = this.actualData.ingredientId
    })
  }

  ngOnInit(): void {
  }





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
      this.patchQuery.amount = this.actualData.amount
      this.patchQuery.measureType = this.actualData.measureType
      this.patchQuery.ingredientId = this.actualData.ingredientId
    }
  }
}
