import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngredientsQuery} from "../../services/ingredients.query";
import {Router} from "@angular/router";
import {IngredientsService} from "../../services/ingredients.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css', '../../../../app.component.css']
})
export class AddIngredientComponent implements OnInit {
  form: FormGroup
  currentIngredientId: number | undefined

  constructor(
    private formBuilder: FormBuilder,
    private ingredientsService: IngredientsService,
    private ingredientsQuery: IngredientsQuery,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
    })
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
}
