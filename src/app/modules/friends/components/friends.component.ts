import {Component, OnInit, ViewChild} from '@angular/core';
// import {Moderator} from "../../../../core/models/moderator.model";
import {MatTableDataSource} from "@angular/material/table";
import {FriendsService} from "../services/friends.service";
import {FriendModel} from "../models/friend.model";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {InviteFriendModel} from "../models/invite-friend.model";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css', '../../../app.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private _liveAnnouncer: LiveAnnouncer, private friendsService: FriendsService) { }

  friends: FriendModel[] = [];
  persons: FriendModel[] = [];
  invites: InviteFriendModel[] = [];

  friendsDisplayedColumns: string[] = ['photoId', 'name', 'inviteButton', 'profileButton'];
  personsDisplayedColumns: string[] = ['photoId', 'name', 'writeButton', 'profileButton', 'addToButton'];
  invitationDisplayedColumns: string[] = ['photoId', 'name', 'date', 'acceptButton', 'declineButton', 'profileButton'];
  friendsDataSource: any;
  personsDataSource: any;
  invitationDataSource: any;

  searchFriendsRequest: string = "";
  searchPersonsRequest: string = "";

  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  ngOnInit(): void {
    this.getFriends(0);
    this.getInvitations(0);
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
    this.friendsService
      .getFriendsByName(name, page)
      .subscribe((friends: FriendModel[]) => {
        this.friends = friends;
        this.friendsDataSource = new MatTableDataSource(this.friends);
        this.friendsDataSource.sort = this.sort;
      });
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
    console.log(name)
    if (name.length < 3){
      console.log("ENTER1")
      this.persons = [];
    } else {
      console.log("ENTER2")

      this.friendsService
        .getPersonsByName(name, page)
        .subscribe((persons: FriendModel[]) => {
          this.persons = persons;
          this.personsDataSource = new MatTableDataSource(this.friends);
          // this.personsDataSource.sort = this.sort;
        });
    }
  }
}
