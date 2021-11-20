import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {ModeratorsMainService} from "./moderators-main.service";
import {Moderator} from "../../../../../core/models/moderator.model";

@Component({
  selector: 'app-moderators-main',
  templateUrl: './moderators-main.component.html',
  styleUrls: ['./moderators-main.component.css', '../../../../../app.component.css']
})
export class ModeratorsMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'personId', 'name', 'email', 'editButton', 'statusButton'];
  private moderators: Moderator[] = [];
  dataSource: any;

  constructor(private _liveAnnouncer: LiveAnnouncer, private moderatorService: ModeratorsMainService) {
  }

  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  private getAllModerators(): void {
    this.moderatorService
      .getAllModerators()
      .subscribe((moderators: Moderator[]) => {
        this.moderators = moderators;
        this.dataSource = new MatTableDataSource(this.moderators);
        this.dataSource.sort = this.sort;
      });
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.getAllModerators();
  }
}
