import { Component, OnInit } from '@angular/core';
import {MODERATORS} from "./mock-moderators";
import {AfterViewInit} from "@angular/core";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ViewChild} from "@angular/core";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.css', '../../../../app.component.css']
})
export class ModeratorsComponent implements AfterViewInit, OnInit{

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

  ngOnInit() {
  }
}
