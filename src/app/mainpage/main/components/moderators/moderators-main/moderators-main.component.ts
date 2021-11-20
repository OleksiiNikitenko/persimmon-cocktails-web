import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MODERATORS} from "../mock-moderators";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {Person} from "../../../../../model/person";
import {HttpErrorResponse} from "@angular/common/http";
import {Moderator} from "../Moderator";
import {LoginService} from "../../../../../login/login.service";
import {ModeratorsMainService} from "./moderators-main.service";
import { catchError, map } from "rxjs/operators"
import {Observable, throwError } from "rxjs";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-moderators-main',
  templateUrl: './moderators-main.component.html',
  styleUrls: ['./moderators-main.component.css', '../../../../../app.component.css']
})
export class ModeratorsMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'personId', 'name', 'email', 'editButton', 'statusButton'];
  moderators: Moderator[] = [];
  dataSource = new MatTableDataSource(this.moderators);

  constructor(private _liveAnnouncer: LiveAnnouncer, private moderatorService: ModeratorsMainService) {}

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
    this.getAllModerators();
    // this.getData()
  }

  getAllModerators(): void {
    this.moderatorService
      .getAllModerators()
      .subscribe((moderators: Moderator[]) => {
        this.moderators = moderators;
        console.log(moderators[0].name)
        console.log(moderators[0].email)
      });
  }
}
