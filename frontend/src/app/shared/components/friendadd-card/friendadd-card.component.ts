import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Invitation } from '../../models/invitation';

@Component({
  selector: 'app-friendadd-card',
  templateUrl: './friendadd-card.component.html',
  styleUrls: ['./friendadd-card.component.sass']
})
export class FriendaddCardComponent implements OnInit {
  @Input() friend;
  @Input() userId;
  send = false;

  invitation: Invitation = {
    _id: '',
    sender: '',
    reciever: '',
    isFriendRequest: true,
    isAccepted: false
  };

  constructor(private http: HttpService, private auth: AuthService) { }

  ngOnInit() {
  }

  addFriend() {
    this.invitation.sender = this.userId;
    this.invitation.reciever = this.friend._id;

    this.http.postItem(this.invitation, '/invitation/').subscribe( invitation => {
      this.send = true;
    });
  }

}
