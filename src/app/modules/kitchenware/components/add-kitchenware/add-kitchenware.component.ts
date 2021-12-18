import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KitchenwareQuery} from "../../services/kitchenware.query";
import {Router} from "@angular/router";
import {KitchenwareService} from "../../services/kitchenware.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ImageUploadService} from "../../../image/services/image-upload-service";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageModel} from "../../../image/model/image.model";

@UntilDestroy()
@Component({
  selector: 'app-add-kitchenware',
  templateUrl: './add-kitchenware.component.html',
  styleUrls: ['./add-kitchenware.component.css', '../../../../app.component.css']
})
export class AddKitchenwareComponent implements OnInit {
  form: FormGroup
  currentKitchenwareId: number | undefined
  imageNotAvailable = '../../../../assets/images/user.png';
  loading: boolean = false;
  file: File | undefined;
  imageUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private kitchenwareService: KitchenwareService,
    private kitchenwareQuery: KitchenwareQuery,
    private router: Router,
    private imageService: ImageUploadService,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: [''],
      status: false,
    })
  }
  onChange(event: any) {

    this.file = event.target.files[0];
  }
  ngOnInit(): void {
    const route = this.router.routerState.snapshot.url.split('/')
    this.currentKitchenwareId = parseInt(route[route.length - 1])

    if (this.currentKitchenwareId) {
      this.kitchenwareQuery.selectEntity(this.currentKitchenwareId).pipe(
        untilDestroyed(this)
      ).subscribe(kitchenware => {
        this.name?.setValue(kitchenware?.name)
        this.category?.setValue(kitchenware?.category?.name)
        this.getImageById(kitchenware?.photoId)
        // this.currentKitchenwareId=kitchenware?.kitchenwareId
      })
    }
  }

  get name() {
    return this.form.get('name')
  }

  get category() {
    return this.form.get('category')
  }

  get status() {
    return this.form.get('status')
  }

  resetFormHandler() {
    this.name?.setValue('')
    this.category?.setValue('')
    this.status?.setValue(false)
  }

  createKitchenware() {
    if (this.form.valid) {
      this.kitchenwareService.createKitchenware(this.form.value)
      this.router.navigate(['kitchenware'])
    }
  }

  editKitchenware() {
    if (this.form.valid) {
      this.kitchenwareService.updateKitchenware({
        kitchenwareId: this.currentKitchenwareId,
        name: this.name?.value
      })
      this.kitchenwareService.fetchKitchenware()
      this.router.navigate(['kitchenware'])
    }
  }
  public getImageById(imageId: any) {
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
  onUpload() {
    if (this.file != undefined) {
      this.loading = !this.loading;
      console.log(this.file);
      this.imageService.upload(this.file).subscribe(
        (event: ImageModel) => {
          if (typeof (event) === 'object') {
            this.loading = false;
            console.log(event)
            this.getImageById(event.imageId)
            console.log(this.currentKitchenwareId, event.imageId)
            this.kitchenwareService.updatePhoto(this.currentKitchenwareId,event.imageId);
            console.log(this.currentKitchenwareId);
            // window.location.reload();
          }
        }
      );
    }
  }
}
