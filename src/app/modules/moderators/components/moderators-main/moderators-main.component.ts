import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {Moderator} from "../../models/moderator.model";
import {ModeratorsQuery} from "../../services/moderators.query";
import {ModeratorsStore} from "../../services/moderators.store";
import {ModeratorsService} from "../../services/moderators.service";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ImageUploadService} from "../../../image/services/image-upload-service";
import {HttpErrorResponse} from "@angular/common/http";

@UntilDestroy()
@Component({
  selector: 'app-moderators-main',
  templateUrl: './moderators-main.component.html',
  styleUrls: ['./moderators-main.component.css', '../../../../app.component.css']
})
export class ModeratorsMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'name', 'email', 'editButton', 'statusButton'];
  moderators: Moderator[] = [];
  imagesUrl: string[] = []
  dataSource: any;
  imageNotAvailable = 'https://i.ibb.co/19rwzVw/22fa8a07b693.png'
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  toggle = true;
  statusBtn:string[] = [];
  status: boolean[] = []

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private moderatorsService: ModeratorsService,
              private moderatorsQuery: ModeratorsQuery,
              private moderatorsStore: ModeratorsStore,
              private cdr: ChangeDetectorRef,
              private imageService: ImageUploadService
  ) {
  }

  getModerators(): Moderator[] {
    return this.moderators;
  }

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
      console.log(moderators)
        this.imagesUrl = Array(moderators.length).fill(this.imageNotAvailable)
        this.setImagesModerators(moderators)
       this.statusBtn=Array(moderators.length).fill('Enable')
      this.handleModeratorStatus(moderators)
      }
    )
  }
handleModeratorStatus(moderators :any){
  for (let i = 0; i < moderators.length; i++) {
    if (!moderators[i].isActive){
      this.statusBtn[i]='Disable';
    }
    else  this.statusBtn[i]='Enable';

  }
}
  ngAfterViewInit(): void {

  }

  public changeStatus(moderatorId:number, index: number) {
    this.moderatorsService.changeStatus(moderatorId)
    // this.toggle = !this.toggle;
    if (this.statusBtn[index]=='Enable'){
      this.statusBtn[index] ='Disable'}
    else
    this.statusBtn[index] = 'Enable';
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
