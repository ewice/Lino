import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { HttpService } from 'src/app/core/http/http.service';
import { User } from 'src/app/shared/models/user';
import { Invitation } from 'src/app/shared/models/invitation';

@Component({
  selector: 'app-friendrequest',
  templateUrl: './friendrequest.component.html',
  styleUrls: ['./friendrequest.component.sass']
})
export class FriendrequestComponent implements OnInit {

  user: User;
  requests = [];
  invitations = [];

  constructor(private http: HttpService, private auth: AuthService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.http.getItem('/users/' + this.auth.getCurrentUserId()).subscribe(data => {
      this.user = data;
      if (this.user.invitations.length > 0) {
        this.getInvitations(this.user.invitations);
      } else {
        this.requests = [];
      }
    });
  }

  getInvitations(invitationsUser: Invitation[]) {
    const friendrequests = [];

    this.http.postItem(invitationsUser, '/invitation/bulk').subscribe( invitations => {
      invitations.forEach(element => {
        if (element.isFriendRequest) {
          friendrequests.push(element.sender);
          this.invitations.push(element);
        }
      });

      if (friendrequests.length > 0) {
        this.http.postItem(friendrequests, '/users/friends').subscribe(data => {
          this.requests = data;
          console.log(this.requests);
        });
      }
    });
  }

}
