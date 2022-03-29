export class Invitation {
  // tslint:disable-next-line: variable-name
  _id: string;
  creationDate?: Date;
  sender: string;
  reciever: string;
  projektId?: string;
  isFriendRequest: boolean;
  isAccepted: boolean;
}
