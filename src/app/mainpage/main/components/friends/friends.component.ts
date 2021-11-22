import {Component, OnInit, ViewChild} from '@angular/core';
import {Moderator} from "../../../../core/models/moderator.model";
import {MatTableDataSource} from "@angular/material/table";
import {FriendsService} from "./friends.service";
import {FriendModel} from "../../../../core/models/friend.model";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {InviteFriendModel} from "../../../../core/models/invite-friend.model";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css', '../../../../app.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private _liveAnnouncer: LiveAnnouncer, private friendsService: FriendsService) { }

  friends: FriendModel[] = [];
  invites: InviteFriendModel[] = [];

  friendsDisplayedColumns: string[] = ['photoId', 'name', 'writeButton', 'profileButton', 'addToButton'];
  invitationDisplayedColumns: string[] = ['photoId', 'name', 'date', 'acceptButton', 'declineButton', 'profileButton'];
  friendsDataSource: any;
  invitationDataSource: any;

  searchRequest: string = "";

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
      .getFriends(page)
      .subscribe((friends: FriendModel[]) => {
        this.friends = friends;
        this.friendsDataSource = new MatTableDataSource(this.friends);
        this.friendsDataSource.sort = this.sort;
      });
  }

  getInvitations(page: number): void {
    this.friendsService
      .getInvitations(page)
      .subscribe((invites: FriendModel[]) => {
        this.invites = invites;
        this.invitationDataSource = new MatTableDataSource(this.invites);
        this.invitationDataSource.sort = this.sort;
      });
  }
}
