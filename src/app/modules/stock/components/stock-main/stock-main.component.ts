import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {FormControl, FormGroup} from "@angular/forms";
import {columnsToSortBy} from "../../models/query";
import {StockService} from "../../services/stock.service";
import {Query} from "../../models/query";
import {QueryDelete} from "../../models/query";
import {StockIngredients} from "../../models/stock-ingredients";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock-main',
  templateUrl: './stock-main.component.html',
  styleUrls: ['./stock-main.component.css', '../../../../app.component.css']
})
export class StockMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photo',  'name', 'categoryName', 'amount', 'measureType', 'ingredientId', 'deleteButton'];
  dataSource: any;
  searchStockIngredientsForm: FormGroup | any;
  public findByNameQuery: Query = {query: "", page: 0, sortByColumn: "nothing"}
  //public deleteQuery: QueryDelete = {ingredientId: 1}
  ingredientsFromStock : StockIngredients[] = [];
  sortColumns: string[] = columnsToSortBy;
  defaultPhotoUrl: string = "http://shorturl.at/quyAS"

  currentIngredientId: number | undefined;

  constructor(private  stockService : StockService,
              private router: Router) {
  }

  @ViewChild(MatSort, {static: false}) sort!: MatSort;


  ngAfterViewInit() {
  }

  ngOnInit(): void {
    const route = this.router.routerState.snapshot.url.split('/')
    this.currentIngredientId = parseInt(route[route.length - 1])
    this.searchStockIngredientsForm = new FormGroup({
      name: new FormControl(''),
      sortColumn: new FormControl(columnsToSortBy)
    });

    this.getStock()
  }

  deleteStockIngredient(ingredientId : number) {
    this.stockService.fetchDeleteIngredientFromStock(ingredientId).subscribe((stockIngredientId) => {

    })
  }

  getStockIngredients() {
    this.stockService.fetchStockIngredientsByName(this.findByNameQuery)
      .subscribe(stockIngredients => {
        this.ingredientsFromStock = stockIngredients;
        this.dataSource = new MatTableDataSource(stockIngredients)
      })
  }

  getStock() {
    this.stockService.fetchStock()
      .subscribe(stockIngredients => {
        this.ingredientsFromStock = stockIngredients;
        this.dataSource = new MatTableDataSource(stockIngredients)
      })
  }

  checkValue(event: KeyboardEvent) {
    return event.code.match(/^[a-zA-Z0-9 -]*$/) ?
      event.code : event.preventDefault();
  }
  fieldIngredientsChanged(currentQueryString: string | null) {

  }
}