import {Component, OnInit, ViewChild} from '@angular/core';
// import {Moderator} from "../../../../core/models/moderator.model";
import {MatTableDataSource} from "@angular/material/table";
import {FriendsService} from "../services/friends.service";
import {PersonsService} from "../services/persons.service";
import {InvitationsService} from "../services/invitations.service";
import {FriendModel} from "../models/friend.model";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {InviteFriendModel} from "../models/invite-friend.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Timestamp} from "rxjs";
import {MainService} from "../services/main.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css', '../../../app.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private friendsService: FriendsService,
              private personsService: PersonsService,
              private invitationsService: InvitationsService,
              private mainService: MainService) {
  }

  friends: FriendModel[] = [];
  persons: FriendModel[] = [];
  invites: InviteFriendModel[] = [];

  // personsDisplayedColumns: string[] = ['photoId', 'name', 'inviteButton', 'profileButton'];
  personsDisplayedColumns: string[] = ['photoId', 'name', 'buttonsBlock'];
  friendsDisplayedColumns: string[] = ['photoId', 'name', 'writeButton', 'profileButton', 'addToButton'];
  invitationDisplayedColumns: string[] = ['photoId', 'name', 'date', 'acceptButton', 'declineButton', 'profileButton'];

  buttonInvitePersonEnabled: boolean[] = []
  buttonAcceptInvitationEnabled: boolean[] = []
  buttonDeclineInvitationEnabled: boolean[] = []
  fieldInvitationMessageEnabled: boolean[] = []

  friendsDataSource: any;
  personsDataSource: any;
  invitationDataSource: any;

  searchPersonsForm: FormGroup | any;
  searchFriendsForm: FormGroup | any;
  messageInvitationForm: FormGroup | any;

  searchFriendsRequest: string = "";
  searchPersonsRequest: string = "";

  validationNamePattern: RegExp = /^(|[a-zA-Z0-9 ]{3,255})$/
  validationMessagePattern: RegExp = /^.{0,100}$/

  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  ngOnInit(): void {
    this.getFriends(0);
    this.getInvitations(0);

    this.searchFriendsForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(this.validationNamePattern)])
    });
    this.searchPersonsForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(this.validationNamePattern)])
    });
    this.messageInvitationForm = new FormGroup({
      message: new FormControl('', [Validators.required, Validators.pattern(this.validationMessagePattern)])
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getFriends(page: number): void {
    this.friendsService
      .getFriends(page)
      .subscribe((friends: FriendModel[]) => {
        this.friends = friends;
        this.friendsDataSource = new MatTableDataSource(this.friends);
        this.friendsDataSource.sort = this.sort;
      });
  }

  getFriendsByName(name: string, page: number): void {
    if (this.searchFriendsForm.valid) {
      this.friendsService
        .getFriendsByName(name, page)
        .subscribe((friends: FriendModel[]) => {
          this.friends = friends;
          this.friendsDataSource = new MatTableDataSource(this.friends);
          this.friendsDataSource.sort = this.sort;
        });
    } else if (name == "") {
      this.getFriends(page)
    }
  }

  getInvitations(page: number): void {
    this.invitationsService
      .getInvitations(page)
      .subscribe((invites: InviteFriendModel[]) => {
        this.invites = invites;
        this.invitationDataSource = new MatTableDataSource(this.invites);
        this.invitationDataSource.sort = this.sort;
        this.buttonAcceptInvitationEnabled = Array(invites.length).fill(true);
        this.buttonDeclineInvitationEnabled = Array(invites.length).fill(true);
      });
  }

  getPersonsByName(name: string, page: number): void {
    if (this.searchPersonsForm.valid) {
      this.personsService
        .getPersonsByName(name, page)
        .subscribe((persons: FriendModel[]) => {
          this.persons = persons;
          this.personsDataSource = new MatTableDataSource(this.persons);
          this.buttonInvitePersonEnabled = Array(persons.length).fill(true);
          this.fieldInvitationMessageEnabled = Array(persons.length).fill(false);
          // this.personsDataSource.sort = this.sort;
        });
    }
    // else if (name == "") {
    //   this.persons = [];
    // }
  }

  fieldFriendsChanged(name: string, page: number): void {
    if (name.length == 0) {
      this.getFriends(page);
    }
  }

  fieldPersonsChanged(name: string, page: number): void {
    if (name.length == 0) {
      this.persons = [];
      this.personsDataSource = new MatTableDataSource(this.persons);
    }
  }

  checkValue(event: any) {
    return this.mainService.checkValue(event);
  }

  sendFriendshipInvitation(personId: number, message: string): void{
    this.invitationsService.sendFriendshipInvitation(personId, message).subscribe(
      (response) => {                           //Next callback
        console.log('response received')
        // this.repos = response;
      },
      (error: HttpErrorResponse) => {                              //Error callback
        alert(error.error.message);
        // alert(JSON.parse(error.json()._body).errors[0])
        // this.errorMessage = error;
        // this.loading = false;

        throw error;
      }
    );
  }

  acceptInvitation(friendId: number){
    this.invitationsService.acceptInvitation(friendId).subscribe(
      (response) => {},
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        throw error;
      });
  }

  declineInvitation(friendId: number) {
    this.invitationsService.declineInvitation(friendId).subscribe(
      (response) => {},
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        throw error;
      });
  }

  getInvitationDate(dateTime: Date){
    dateTime = new Date(dateTime)
    console.log(typeof dateTime)

    const datePipe: DatePipe = new DatePipe('en-US')
    if (this.mainService.getDifferenceInDays(dateTime)<1){
      console.log("Formatted date1:"+datePipe.transform(dateTime, 'HH:mm:ss'))
      return datePipe.transform(dateTime, 'HH:mm:ss');
    }
    console.log("Formatted date2:"+datePipe.transform(dateTime, 'dd-MM-YYYY HH:mm:ss'))
    return datePipe.transform(dateTime, 'dd-MM-YYYY HH:mm:ss');
  }

  changeMessageFieldVisibility(i: number): void{
    this.fieldInvitationMessageEnabled[i] = !this.fieldInvitationMessageEnabled[i];
  }
}
