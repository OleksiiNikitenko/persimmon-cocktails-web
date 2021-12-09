import {Component, OnInit} from '@angular/core';
import {ADMIN} from "../../../core/models/admin";
import {ChangePasswordComponent} from "../../change-password/change-password.component";
import {LoginService} from "../../login/services/login.service";
import {getUserID} from "../../../core/models/user";
import {SettingsService} from "../services/settings-services";
import {Person} from "../../../core/models/Person";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../../app.component.css'],
  providers: [ChangePasswordComponent]
})
export class SettingsComponent implements OnInit {
  form: FormGroup

  personID = getUserID;
user: Person | undefined

  constructor(public dialogChangePass: ChangePasswordComponent, private settingsService: SettingsService,
  private formBuilder: FormBuilder) { {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]

    })
  }}
  // editModerator() {
  //   if (this.form.valid) {
  //     this.settingsService.updateUser(       this.name?.value
  //     )
  //     // this.moderatorsService.fetchModerators()
  //     // this.router.navigate(['moderators'])
  //   }
  // }

  ngOnInit(): void {

  }
  updateName(){
    // this.settingsService.updateUser(this.user?.name).subscribe();
  }
}
