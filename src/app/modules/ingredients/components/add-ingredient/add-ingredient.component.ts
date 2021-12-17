import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngredientsQuery} from "../../services/ingredients.query";
import {Router} from "@angular/router";
import {IngredientsService} from "../../services/ingredients.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ImageModel} from "../../../image/model/image.model";
import {ImageUploadService} from "../../../image/services/image-upload-service";
import {IngredientMainComponent} from "../ingredient-main/ingredient-main.component";
import {HttpErrorResponse} from "@angular/common/http";

@UntilDestroy()
@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css', '../../../../app.component.css']
})
export class AddIngredientComponent implements OnInit {
  form: FormGroup
  currentIngredientId: number | undefined
  imageUrl: any;
  imageNotAvailable = '../../../../assets/images/user.png';
  loading: boolean = false;
  file: File | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private ingredientsService: IngredientsService,
    private ingredientsQuery: IngredientsQuery,
    private router: Router,
    private imageService: ImageUploadService,


  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
    })
  }
  onChange(event: any) {

    this.file = event.target.files[0];
  }
  ngOnInit(): void {
    const route = this.router.routerState.snapshot.url.split('/')
    this.currentIngredientId = parseInt(route[route.length - 1])

    if (this.currentIngredientId) {
      this.ingredientsQuery.selectEntity(this.currentIngredientId).pipe(
        untilDestroyed(this)
      ).subscribe(ingredient => {
        this.name?.setValue(ingredient?.name)
        this.category?.setValue(ingredient?.category?.name)
        this.getImageById(ingredient?.photoId)

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

  createIngredient() {
    if (this.form.valid) {
      this.ingredientsService.createIngredient(this.form.value)
      this.router.navigate(['ingredients'])
    }
  }

  editIngredient() {
    if (this.form.valid) {
      this.ingredientsService.updateIngredient({
        ingredientId: this.currentIngredientId,
        name: this.name?.value
      })
      this.ingredientsService.fetchIngredients()
      this.router.navigate(['ingredients'])
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
            console.log(this.currentIngredientId, event.imageId)
            this.ingredientsService.updatePhoto(this.currentIngredientId,event.imageId);
            console.log(this.currentIngredientId);
            // window.location.reload();
          }
        }
      );
    }
  }

}
