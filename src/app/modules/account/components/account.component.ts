import {Component, OnInit} from '@angular/core';
import {ADMIN} from "../../../core/models/admin";
import {Moderator} from "../../moderators/models/moderator.model";
import {ModeratorsMainComponent} from "../../moderators/components/moderators-main/moderators-main.component";
import {AccountService} from "../services/account-service";
import {Observable} from "rxjs";
import {AccessUserStorage} from "../../../storage/accessUserStorage";
import {Person} from "../../../core/models/Person";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SettingsService} from "../../settings/services/settings-services";
import {FoundUsersModel} from "../../friends/models/found-users.model";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/user-model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
//
//   // person = ADMIN; //удалить и нормально подгружать текущую роль
//   // moderators = ModeratorsMainComponent().getModerators();
//
//   constructor(private activatedRoute: ActivatedRoute, private accountService: AccountService, private accessUserStorage:  AccessUserStorage) {
//   }
//
//
//   // private  userId$: this.accessUserStorage.get()?.id
//   ngOnInit(): void {
//
//   }
//   private personId$: Observable<number> = this.activatedRoute.params.pipe(
//     map((params: Params) => parseInt(params['id']))
//   )
//   user$: Observable<Person> = this.personId$.pipe(
//     switchMap((personId: number) => this.accountService.findOne(personId))
//   )
// }

  // profile = {personId: null, name: null, email: null, createdAt: null, photoPath: ''};
  // isLogged: boolean;


  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private router: Router,
              private settingsService: SettingsService,
              private dialog: MatDialog,
              private accessUserStorage:  AccessUserStorage) {
  }

  // private setDefaultAvatar() {
  //   this.profile.photoPath = '../../../assets/images/default_avatar.jpg';
  // }

  ngOnInit() {
console.log(this.getPersonsById());
  }
  person : User | undefined;
  getPersonsByName(name: string): void {
    this.accountService.getPersonById(2).subscribe((person : User) =>
    {this.person=person;})
    // let page = this.currentPageNumberPersons;
    // if (this.searchPersonsForm.valid) {
    //   this.personsService
    //     .getPersonsByName(name, page)
    //     .subscribe((persons: FoundUsersModel[]) => {
    //       this.persons = persons;
    //       this.personsDataSource = new MatTableDataSource(this.persons);
    //       this.buttonInvitePersonEnabled = Array(persons.length).fill(true);
    //       this.actualizeButtonInviteStatus();
    //       this.fieldInvitationMessageEnabled = Array(persons.length).fill(false);
    //       this.fieldInvitationMessageText = Array(persons.length).fill('');
    //     });
    // }
  }

  getPersonsById(): void {
    this.accountService.getPersonById(2).subscribe((person : User) =>
    {this.person=person;})

}
  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  )
  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.accountService.getPersonById(2)
  ))
}







