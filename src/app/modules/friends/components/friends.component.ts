import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {FoundUsersModel} from "../models/found-users.model";
import {ImageUploadService} from "../../image/services/image-upload-service";

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css', '../../../app.component.css']
})
export class FriendsComponent implements OnInit {


    defaultAvatar = '../../../../assets/images/user.png'
    imageNotAvailable = '../../../../assets/images/image-not-found.jpg'

    friends: FriendModel[] = [];
    persons: FoundUsersModel[] = [];
    invites: InviteFriendModel[] = [];

    personsDisplayedColumns: string[] = ['photoId', 'name', 'buttonsBlock'];

    friendsDisplayedColumns: string[] = ['photoId', 'name', 'deleteButton'];
    invitationDisplayedColumns: string[] = ['photoId', 'name', 'date', 'acceptButton', 'declineButton'];

    buttonInvitePersonEnabled: boolean[] = []
    buttonAcceptInvitationEnabled: boolean[] = []
    buttonDeclineInvitationEnabled: boolean[] = []
    buttonDeleteFriendEnabled: boolean[] = []
    fieldInvitationMessageEnabled: boolean[] = []
    fieldInvitationMessageText: string[] = []

    imagesUrlPersons: string[] = []
    imagesUrlFriends: string[] = []
    imagesUrlInvitation: string[] = []

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

    personsWasSearched: boolean = false;

    validationNamePattern: RegExp = /^(|[a-zA-Z0-9 ]{3,255})$/
    validationMessagePattern: RegExp = /^.{,100}$/

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private friendsService: FriendsService,
              private personsService: PersonsService,
              private invitationsService: InvitationsService,
              private mainService: MainService,
              private imageService: ImageUploadService) {
  }

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

    getFriends(page: number): void {
        this.friendsService
            .getFriends(page)
            .subscribe((friends: FriendModel[]) => {
                this.friends = friends;
                this.friendsDataSource = new MatTableDataSource(this.friends);
                this.imagesUrlFriends = Array(friends.length).fill(this.defaultAvatar);
                this.initFriendsPagesAmount();
                this.setImagesFriends(friends);
                this.buttonDeleteFriendEnabled = Array(friends.length).fill(true);
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
                    this.imagesUrlFriends = Array(friends.length).fill(this.defaultAvatar);
                    this.buttonDeleteFriendEnabled = Array(friends.length).fill(true);
                    this.setImagesFriends(friends);
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
                this.buttonAcceptInvitationEnabled = Array(invites.length).fill(true);
                this.buttonDeclineInvitationEnabled = Array(invites.length).fill(true);
                this.imagesUrlInvitation = Array(invites.length).fill(this.defaultAvatar)
                this.setImagesInvitations(invites);
                this.initInvitationsPagesAmount();
            });
    }

    getPersonsByName(name: string): void {
        let page = this.currentPageNumberPersons;
        if (this.searchPersonsForm.valid) {
            this.personsService
                .getPersonsByName(name, page)
                .subscribe((persons: FoundUsersModel[]) => {
                    this.persons = persons;
                    this.personsDataSource = new MatTableDataSource(this.persons);
                    this.buttonInvitePersonEnabled = Array(persons.length).fill(true);
                    this.actualizeButtonInviteStatus();
                    this.fieldInvitationMessageEnabled = Array(persons.length).fill(false);
                    this.fieldInvitationMessageText = Array(persons.length).fill('');
                    this.imagesUrlPersons = Array(persons.length).fill(this.defaultAvatar)
                    this.setImagesPersons(persons);
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
            (response) => {
                console.log('response received')
            },
            (error: HttpErrorResponse) => {
                alert(error.error.message);
                throw error;
            }
        );
    }

  getImageByIdInvitations(imageId: number, i: number) {
    if (imageId != null) {
      this.imageService.getImageById(imageId).subscribe(
        (response) => {
          if (response != null)
            this.imagesUrlInvitation[i] = response.urlMiddle
          else this.imagesUrlInvitation[i] = this.imageNotAvailable
        },
        (error: HttpErrorResponse) => {
          throw error;
        }
      );
    }
  }

  getImageByIdFriends(imageId: number, i: number) {
    if (imageId != null) {
      this.imageService.getImageById(imageId).subscribe(
        (response) => {
          if (response != null)
            this.imagesUrlFriends[i] = response.urlMiddle
          else
            this.imagesUrlFriends[i] = this.imageNotAvailable

        },
        (error: HttpErrorResponse) => {
          throw error;
        }
      );
    }
  }

  getImageByIdPersons(imageId: number, i: number) {
    if (imageId != null) {
      this.imageService.getImageById(imageId).subscribe(
        (response) => {
          if (response != null)
            this.imagesUrlPersons[i] = response.urlMiddle
          else
            this.imagesUrlPersons[i] = this.imageNotAvailable
        },
        (error: HttpErrorResponse) => {
          throw error;
        }
      );
    }
  }

    setImagesInvitations(persons: InviteFriendModel[]) {
        for (let i = 0; i < persons.length; i++) {
            this.getImageByIdInvitations(persons[i].photoId, i)
        }
    }

    setImagesFriends(persons: FriendModel[]) {
        for (let i = 0; i < persons.length; i++) {
            this.getImageByIdFriends(persons[i].photoId, i)
        }
    }

    setImagesPersons(persons: FoundUsersModel[]) {
        for (let i = 0; i < persons.length; i++) {
            this.getImageByIdPersons(persons[i].photoId, i)
        }
    }

    acceptInvitation(friendId: number) {
        this.invitationsService.acceptInvitation(friendId).subscribe(
            (response) => {
              this.getFriendsByName('');
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

    getInvitationDate(dateTime: Date): any {
        if (dateTime == null) return 'Date not specified'
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
  deleteFriend(personId: number): void {
    this.friendsService.deleteFriend(personId).subscribe((response) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        throw error;
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

    private actualizeButtonInviteStatus() {
        for (let i = 0; i < this.persons.length; i++) {
            if (this.persons[i].isInvited) {
                this.buttonInvitePersonEnabled[i] = false;
            }
        }
    }
}
