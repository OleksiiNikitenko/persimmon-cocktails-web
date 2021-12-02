import {Timestamp} from "rxjs";

export class InviteFriendModel{
  personId!: number;
  name!: string;
  message!: string;
  photoId!: number;
  blogId!: number;
  localDateTime!: Date;
  // localDateTime!: Timestamp<any>;
  // localDateTime!: Date;
}
