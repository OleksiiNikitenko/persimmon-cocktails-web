export class RequestFriendshipInvitationDto {
  personReceiverId!: number;
  message!: string;

  constructor(personReceiverId: number, message: string) {
    this.personReceiverId = personReceiverId;
    this.message = message;
  }
}
