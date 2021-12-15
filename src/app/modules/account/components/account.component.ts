import {User} from "../models/user-model";
import {UntilDestroy} from '@ngneat/until-destroy';
import {MatSort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {AfterViewInit, ChangeDetectorRef, Component, Injectable, OnInit, ViewChild} from "@angular/core";
import {UserStore} from "../services/user-store";
import {UserQuery} from "../services/user-query";
import {UserService} from "../services/user-service";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageUploadService} from "../../image/services/image-upload-service";


@Injectable({providedIn: 'root'})
@UntilDestroy()
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../../../app.component.css']
})
export class AccountComponent implements AfterViewInit, OnInit {
  person: User | undefined;
  dataSource: any;
  imageUrl: any;
  imageNotAvailable = '../../../../assets/images/user.png';

  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService,
    private userQuery: UserQuery,
    private userStore: UserStore,
    private cdr: ChangeDetectorRef,
    private imageService: ImageUploadService,
  ) {

  }

  ngOnInit() {
    this.userQuery.select().subscribe(person => {
      this.person = person
      this.cdr.markForCheck()
      this.getImageById(person.photoId)
      console.log(this.imageUrl)
    })
  }

  public getImageById(imageId: number) {
    if (imageId != null) {
      this.imageService.getImageById(imageId).subscribe(
        (response) => {
          if (response != null)
            this.imageUrl = response.urlMiddle
          else
            this.imageUrl = this.imageNotAvailable
        },
        (error: HttpErrorResponse) => {
          throw error;
        }
      );
    }
  }


  ngAfterViewInit(): void {  }

}



