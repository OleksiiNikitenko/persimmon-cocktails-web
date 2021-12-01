import {Component, OnInit, ViewChild} from '@angular/core';
// import {Moderator} from "../../../../core/models/moderator.model";
import {MatTableDataSource} from "@angular/material/table";
import {FriendsService} from "../services/friends.service";
import {FriendModel} from "../models/friend.model";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {InviteFriendModel} from "../models/invite-friend.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css', '../../../app.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private _liveAnnouncer: LiveAnnouncer, private friendsService: FriendsService) {
  }

  friends: FriendModel[] = [];
  persons: FriendModel[] = [];
  invites: InviteFriendModel[] = [];

  personsDisplayedColumns: string[] = ['photoId', 'name', 'inviteButton', 'profileButton'];
  friendsDisplayedColumns: string[] = ['photoId', 'name', 'writeButton', 'profileButton', 'addToButton'];
  invitationDisplayedColumns: string[] = ['photoId', 'name', 'date', 'acceptButton', 'declineButton', 'profileButton'];

  buttonEnabled: boolean[] = []

  friendsDataSource: any;
  personsDataSource: any;
  invitationDataSource: any;

  searchPersonsForm: FormGroup | any;
  searchFriendsForm: FormGroup | any;

  searchFriendsRequest: string = "";
  searchPersonsRequest: string = "";

  validationNamePattern: RegExp = /^(|[a-zA-Z0-9 ]{3,255})$/

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
    this.friendsService
      .getInvitations(page)
      .subscribe((invites: InviteFriendModel[]) => {
        this.invites = invites;
        this.invitationDataSource = new MatTableDataSource(this.invites);
        this.invitationDataSource.sort = this.sort;
      });
  }

  getPersonsByName(name: string, page: number): void {
    if (this.searchPersonsForm.valid) {
      this.friendsService
        .getPersonsByName(name, page)
        .subscribe((persons: FriendModel[]) => {
          this.persons = persons;
          this.personsDataSource = new MatTableDataSource(this.persons);
          this.buttonEnabled = Array(persons.length).fill(true)
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
    return String.fromCharCode(event.charCode).match(/^[a-zA-Z0-9 ]*$/) ?
      event.CharCode : event.preventDefault();
  }

  sendFriendshipInvitation(personId: number, message: string): void{
    this.friendsService.sendFriendshipInvitation(personId, message).subscribe(

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
}
