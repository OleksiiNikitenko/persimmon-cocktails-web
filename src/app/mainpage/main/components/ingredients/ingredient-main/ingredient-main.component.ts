import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {INGREDIENTS} from "../mock-ingredients";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-ingredient-main',
  templateUrl: './ingredient-main.component.html',
  styleUrls: ['./ingredient-main.component.css', '../../../../../app.component.css']
})
export class IngredientMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'ingredientId', 'name', 'category', 'editButton', 'statusButton'];
  dataSource = new MatTableDataSource(INGREDIENTS);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = null!;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
  }

}
