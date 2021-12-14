import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KitchenwareQuery} from "../../services/kitchenware.query";
import {Router} from "@angular/router";
import {KitchenwareService} from "../../services/kitchenware.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-add-kitchenware',
  templateUrl: './add-kitchenware.component.html',
  styleUrls: ['./add-kitchenware.component.css', '../../../../app.component.css']
})
export class AddKitchenwareComponent implements OnInit {
  form: FormGroup
  currentKitchenwareId: number | undefined

  constructor(
    private formBuilder: FormBuilder,
    private kitchenwareService: KitchenwareService,
    private kitchenwareQuery: KitchenwareQuery,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: [''],
      status: false,
    })
  }

  ngOnInit(): void {
    const route = this.router.routerState.snapshot.url.split('/')
    this.currentKitchenwareId = parseInt(route[route.length - 1])

    if (this.currentKitchenwareId) {
      this.kitchenwareQuery.selectEntity(this.currentKitchenwareId).pipe(
        untilDestroyed(this)
      ).subscribe(kitchenware => {
        this.name?.setValue(kitchenware?.name)
        this.category?.setValue(kitchenware?.category)
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

}
