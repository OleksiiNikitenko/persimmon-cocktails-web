import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {Moderator} from "../../models/moderator.model";
import {ModeratorsQuery} from "../../services/moderators.query";
import {ModeratorsStore} from "../../services/moderators.store";
import {ModeratorsService} from "../../services/moderators.service";
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';
import {AddModeratorComponent} from "../add-moderator/add-moderator.component";
import {ImageUploadService} from "../../../image/services/image-upload-service";
import {HttpErrorResponse} from "@angular/common/http";
import {FoundUsersModel} from "../../../friends/models/found-users.model";

@UntilDestroy()
@Component({
  selector: 'app-moderators-main',
  templateUrl: './moderators-main.component.html',
  styleUrls: ['./moderators-main.component.css', '../../../../app.component.css']
})
export class ModeratorsMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId',  'name', 'email', 'editButton', 'statusButton'];
  moderators: Moderator[] = [];
  imagesUrl: string[] = []
  dataSource: any;
  imageNotAvailable = '../../../../assets/images/moder-avatar.png'
    constructor(private _liveAnnouncer: LiveAnnouncer,
              private moderatorsService: ModeratorsService,
              private moderatorsQuery: ModeratorsQuery,
              private moderatorsStore: ModeratorsStore,
              private cdr: ChangeDetectorRef,
                private imageService: ImageUploadService
    ) {}

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
        this.imagesUrl = Array(moderators.length).fill(this.imageNotAvailable)
        this.setImagesModerators(moderators)

    }
    )




  }

  ngAfterViewInit(): void {

  }
  toggle = true;
  statusBtn = 'Enable';


  public changeStatus(){
    // this.moderatorsService.changeStatus(11)
    this.toggle = !this.toggle;
    this.statusBtn = this.toggle ? 'Enable' : 'Disable';
  }

  getImageByIdModerators(imageId: number, i: number) {
    if (imageId != null) {
      this.imageService.getImageById(imageId).subscribe(
        (response) => {
          if (response != null)
            this.imagesUrl[i] = response.urlMiddle
          else
            this.imagesUrl[i] = this.imageNotAvailable
        },
        (error: HttpErrorResponse) => {
          // alert(error.error.message);
          throw error;
        }
      );
    }
  }
  setImagesModerators(moderators: any) {
    for (let i = 0; i < moderators.length; i++) {
      this.getImageByIdModerators(moderators[i].photoId, i)
    }
  }
}
