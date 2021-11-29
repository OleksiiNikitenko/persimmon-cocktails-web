import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from '@angular/material/paginator';
import {generate} from "rxjs";
import {KitchenwareService} from "./kitchenware.service";
import {ActiveKitchenware} from "../../../../../model/kitchenware/activeKitchenware";

@Component({
  selector: 'app-kitchenware-main',
  templateUrl: './kitchenware-main.component.html',
  styleUrls: ['./kitchenware-main.component.css', '../../../../../app.component.css']
})
export class KitchenwareMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'kitchenwareId', 'name', 'category', 'editButton', 'statusButton'];
  dataSource = new MatTableDataSource(this.kitchenwareService.kitchenwareList);

  constructor(private _liveAnnouncer: LiveAnnouncer, private kitchenwareService: KitchenwareService) {}

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
    this.kitchenwareService.updateAllKitchenware();
  }

}
