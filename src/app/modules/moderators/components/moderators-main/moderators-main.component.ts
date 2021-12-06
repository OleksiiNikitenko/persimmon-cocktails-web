import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {ModeratorsMainService} from "../../services/moderators-main.service";
import {Moderator} from "../../models/moderator.model";
import {ModeratorsQuery} from "../../services/moderators.query";
import {ModeratorsStore} from "../../services/moderators.store";
import {ModeratorsService} from "../../services/moderators.service";
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
  selector: 'app-moderators-main',
  templateUrl: './moderators-main.component.html',
  styleUrls: ['./moderators-main.component.css', '../../../../app.component.css']
})
export class ModeratorsMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'personId', 'name', 'email', 'editButton', 'statusButton'];
  moderators: Moderator[] = [];
  dataSource: any;

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private moderatorsService: ModeratorsService,
              private moderatorsQuery: ModeratorsQuery,
              private moderatorsStore: ModeratorsStore,
              private cdr: ChangeDetectorRef) {}

  getModerators(): Moderator[]{
    return this.moderators;
  }

  @ViewChild(MatSort, {static: false}) sort!: MatSort;


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.moderatorsService.fetchModerators()

    this.moderatorsQuery.selectAll().pipe(
      untilDestroyed(this)
    ).subscribe(moderators => {
      this.dataSource = new MatTableDataSource(moderators)
      this.dataSource.sort = this.sort;
      this.cdr.markForCheck()
    })
  }

  ngAfterViewInit(): void {
  }

}
