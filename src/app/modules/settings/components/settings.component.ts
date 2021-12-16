

import {ADMIN} from "../../../core/models/admin";
import {ChangePasswordComponent} from "../../change-password/componets/change-password.component";

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserQuery} from "../../account/services/user-query";
import {User} from "../../account/models/user-model";
import {UserService} from "../../account/services/user-service";
import {ImageModel} from "../../image/model/image.model";
import {ImageUploadService} from "../../image/services/image-upload-service";
import {AccountComponent} from "../../account/components/account.component";
import {HttpErrorResponse} from "@angular/common/http";



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../../app.component.css'],
  providers: [ChangePasswordComponent]
})
export class SettingsComponent implements OnInit {
  person: User | undefined;
  form: FormGroup
  imageUrl: any;
  imageNotAvailable = '../../../../assets/images/user.png';
  loading: boolean = false;
  file: File | undefined;

  constructor(
    public dialogChangePass: ChangePasswordComponent,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userQuery: UserQuery,
    private cdr: ChangeDetectorRef,
    private imageService: ImageUploadService,
    private accountComponent: AccountComponent,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  get name() {
    return this.form?.controls?.name
  }

  ngOnInit(): void {
    this.userQuery.select().subscribe(person => {
      this.person = person
      this.name?.setValue(person.name)
      this.cdr.markForCheck()
      // this.accountComponent.getImageById(person.photoId)
      this.getImageById(person.photoId)
    })
  }

  renameUser() {
    this.userService.updateUserName(this.form.value)
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

  onChange(event: any) {

    this.file = event.target.files[0];
  }

  onUpload() {
    if (this.file != undefined) {
      this.loading = !this.loading;
      console.log(this.file);
      this.imageService.upload(this.file).subscribe(
        (event: ImageModel) => {
          if (typeof (event) === 'object') {
            this.loading = false;
            console.log(event)
            this.accountComponent.getImageById(event.imageId);
            this.userService.updatePhoto(event.imageId);
            window.location.reload();
          }
        }
      );
    }
  }
}
