import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {MainService} from "../services/main.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css', '../../../app.component.css']
})
export class FriendsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private friendsService: FriendsService,
              private personsService: PersonsService,
              private invitationsService: InvitationsService,
              private mainService: MainService) {
  }

  friends: FriendModel[] = [];
  persons: FriendModel[] = [];
  invites: InviteFriendModel[] = [];

  personsDisplayedColumns: string[] = ['photoId', 'name', 'buttonsBlock'];
  friendsDisplayedColumns: string[] = ['photoId', 'name', 'writeButton', 'profileButton', 'addToButton'];
  invitationDisplayedColumns: string[] = ['photoId', 'name', 'date', 'acceptButton', 'declineButton', 'profileButton'];

  buttonInvitePersonEnabled: boolean[] = []
  buttonAcceptInvitationEnabled: boolean[] = []
  buttonDeclineInvitationEnabled: boolean[] = []
  fieldInvitationMessageEnabled: boolean[] = []
  fieldInvitationMessageText: string[] = []

  friendsDataSource: any;
  personsDataSource: any;
  invitationDataSource: any;

  searchPersonsForm: FormGroup | any;
  searchFriendsForm: FormGroup | any;
  messageInvitationForm: FormGroup | any;

  searchFriendsRequest: string = "";
  searchPersonsRequest: string = "";

  currentPageNumberInvitation: number = 0;
  currentPageNumberFriends: number = 0;
  currentPageNumberPersons: number = 0;

  amountPagesPersons: number = 0;
  amountPagesFriends: number = 0;
  amountPagesInvitation: number = 0;

  validationNamePattern: RegExp = /^(|[a-zA-Z0-9 ]{3,255})$/
  validationMessagePattern: RegExp = /^.{,100}$/

  ngOnInit(): void {
    this.getFriends(0);
    this.getInvitations();

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

  ngAfterViewInit() {
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
        this.initFriendsPagesAmount();
      });
  }

  getFriendsByName(name: string): void {
    let page = this.currentPageNumberFriends;
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

  getInvitations(): void {
    let page = this.currentPageNumberInvitation;
    this.invitationsService
      .getInvitations(page)
      .subscribe((invites: InviteFriendModel[]) => {
        this.invites = invites;
        this.invitationDataSource = new MatTableDataSource(this.invites);
        this.invitationDataSource.sort = this.sort;
        this.buttonAcceptInvitationEnabled = Array(invites.length).fill(true);
        this.buttonDeclineInvitationEnabled = Array(invites.length).fill(true);
        this.initInvitationsPagesAmount();
      });
  }

  getPersonsByName(name: string): void {
    let page = this.currentPageNumberPersons;
    if (this.searchPersonsForm.valid) {
      this.personsService
        .getPersonsByName(name, page)
        .subscribe((persons: FriendModel[]) => {
          this.persons = persons;
          this.personsDataSource = new MatTableDataSource(this.persons);
          this.buttonInvitePersonEnabled = Array(persons.length).fill(true);
          this.fieldInvitationMessageEnabled = Array(persons.length).fill(false);
          this.fieldInvitationMessageText = Array(persons.length).fill('');
        });
    }
  }

  fieldFriendsChanged(name: string, page: number): void {
    if (name.length == 0) {
      this.getFriends(page);
    }
  }

  fieldPersonsChanged(name: string): void {
    if (name.length == 0) {
      this.persons = [];
      this.personsDataSource = new MatTableDataSource(this.persons);
    }
  }

  checkValue(event: any) {
    return this.mainService.checkValue(event);
  }

  sendFriendshipInvitation(personId: number, message: string): void {
    this.invitationsService.sendFriendshipInvitation(personId, message).subscribe(
      (response) => {                           //Next callback
        console.log('response received')
      },
      (error: HttpErrorResponse) => {                              //Error callback
        alert(error.error.message);
        throw error;
      }
    );
  }

  acceptInvitation(friendId: number) {
    this.invitationsService.acceptInvitation(friendId).subscribe(
      (response) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        throw error;
      });
  }

  declineInvitation(friendId: number) {
    this.invitationsService.declineInvitation(friendId).subscribe(
      (response) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        throw error;
      });
  }

  getInvitationDate(dateTime: Date) {
    dateTime = new Date(dateTime)
    const datePipe: DatePipe = new DatePipe('en-US')
    if (this.mainService.getDifferenceInDays(dateTime) < 1) {
      return datePipe.transform(dateTime, 'HH:mm:ss');
    }
    return datePipe.transform(dateTime, 'dd-MM-YYYY HH:mm:ss');
  }

  changeMessageFieldVisibility(i: number): void {
    this.fieldInvitationMessageEnabled[i] = !this.fieldInvitationMessageEnabled[i];
  }

  handleMessage(message: string): string {
    return this.invitationsService.handleMessage(message);
  }

  initPersonsPagesAmount(): void {
    this.personsService.getPagesAmount(this.searchPersonsRequest).subscribe((numberOfPages: number) => {
      this.amountPagesPersons = numberOfPages;
    });
  }

  initFriendsPagesAmount(): void {
    this.friendsService.getPagesAmount(this.searchFriendsRequest).subscribe((numberOfPages: number) => {
      this.amountPagesFriends = numberOfPages;
    });
  }

  initInvitationsPagesAmount(): void {
    this.invitationsService.getPagesAmount().subscribe((numberOfPages: number) => {
      this.amountPagesInvitation = numberOfPages;
    });
  }

  setPageDiffUsers(pageDiff: number): void {
    this.currentPageNumberPersons += pageDiff
    this.getPersonsByName(this.searchPersonsRequest)
  }

  endPageUsers() {
    this.currentPageNumberPersons = this.amountPagesPersons - 1
    this.getPersonsByName(this.searchPersonsRequest)
  }

  beginPageUsers() {
    this.currentPageNumberPersons = 0
    this.getPersonsByName(this.searchPersonsRequest)
  }

  setPageDiffFriends(pageDiff: number): void {
    this.currentPageNumberFriends += pageDiff
    this.getFriendsByName(this.searchFriendsRequest)
  }

  endPageFriends() {
    this.currentPageNumberFriends = this.amountPagesFriends - 1
    this.getFriendsByName(this.searchFriendsRequest)
  }

  beginPageFriends() {
    this.currentPageNumberFriends = 0
    this.getFriendsByName(this.searchFriendsRequest)
  }

  setPageDiffInvitations(pageDiff: number): void {
    this.currentPageNumberInvitation += pageDiff
    this.getInvitations()
  }

  endPageInvitations() {
    this.currentPageNumberInvitation = this.amountPagesInvitation - 1
    this.getInvitations()
  }

  beginPageInvitations() {
    this.currentPageNumberInvitation = 0
    this.getInvitations()
  }
}
