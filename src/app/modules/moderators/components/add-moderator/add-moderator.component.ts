import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModeratorsService} from "../../../services/moderators.service";
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {ModeratorsQuery} from "../../../services/moderators.query";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-add-moderator',
  templateUrl: './add-moderator.component.html',
  styleUrls: ['./add-moderator.component.css', '../../../../app.component.css']
})
export class AddModeratorComponent implements OnInit {
  form: FormGroup
  currentUserId: number | undefined

  constructor(
    private formBuilder: FormBuilder,
    private moderatorsService: ModeratorsService,
    private moderatorsQuery: ModeratorsQuery,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: false,
    })
  }

  ngOnInit(): void {
    const route = this.router.routerState.snapshot.url.split('/')
    this.currentUserId = parseInt(route[route.length - 1])

    if (this.currentUserId) {
      this.email?.disable()

      this.moderatorsQuery.selectEntity(this.currentUserId).pipe(
        untilDestroyed(this)
      ).subscribe(moderator => {
        this.name?.setValue(moderator?.name)
        this.email?.setValue(moderator?.email)
      })
    }
  }

  get name() {
    return this.form.get('name')
  }

  get email() {
    return this.form.get('email')
  }

  get status() {
    return this.form.get('status')
  }

  resetFormHandler() {
    this.name?.setValue('')
    this.status?.setValue(false)
    if (!this.currentUserId) {
      this.email?.setValue('')
    }
  }

  createModerator() {
    if (this.form.valid) {
      this.moderatorsService.createModerator(this.form.value)
      this.router.navigate(['moderators'])
    }
  }

  editModerator() {
    if (this.form.valid) {
      this.moderatorsService.updateModerator({
        personId: this.currentUserId,
        name: this.name?.value,
        status: this.status?.value,
      })
      this.moderatorsService.fetchModerators()
      this.router.navigate(['moderators'])
    }
  }
}
