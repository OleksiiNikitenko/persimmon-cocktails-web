import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChangePasswordComponent} from "../../change-password/change-password.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserQuery} from "../../account/services/user-query";
import {User} from "../../account/models/user-model";
import {UserService} from "../../account/services/user-service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../../app.component.css'],
  providers: [ChangePasswordComponent]
})
export class SettingsComponent implements OnInit {
  person: User | undefined;
  form: FormGroup

  constructor(
    public dialogChangePass: ChangePasswordComponent,
    // private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userQuery: UserQuery,
    private cdr: ChangeDetectorRef,
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
    })
  }

  renameUser() {
    this.userService.updateUserName(this.form.value)
  }
}
