import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MODERATORS} from "../mock-moderators";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-moderators-main',
  templateUrl: './moderators-main.component.html',
  styleUrls: ['./moderators-main.component.css', '../../../../../app.component.css']
})
export class ModeratorsMainComponent implements AfterViewInit, OnInit {

  // displayedColumns: string[] = ['photoId', 'personId', 'name', 'email', 'editButton', 'statusButton'];
  displayedColumns: string[] = ['photoId', 'personId', 'name', 'email', 'editButton', 'statusButton'];
  dataSource = new MatTableDataSource(MODERATORS);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
  }

}
