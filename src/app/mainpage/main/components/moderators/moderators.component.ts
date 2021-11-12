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
export class ModeratorsComponent implements OnInit{


  ngOnInit() {
  }
}
