import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
//import {ModeratorsMainService} from "../../services/moderators-main.service";
//import {Moderator} from "../../models/moderator.model";

@Component({
  selector: 'app-stock-main',
  templateUrl: './stock-main.component.html',
  styleUrls: ['./stock-main.component.css', '../../../../app.component.css']
})
export class StockMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'name', 'category', 'amount', 'measureType', 'editButton'];

  dataSource: any;

  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {

  }
}
