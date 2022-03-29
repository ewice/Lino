import { Component, OnInit} from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit {
  user: User;
  friend: User;
  friends = [];
  value: string;

  errorFriend: boolean;
  errorFriends: boolean;

  constructor(private http: HttpService, private auth: AuthService) { }

  ngOnInit() {
    this.http.getItem('/users/' + this.auth.getCurrentUserId()).subscribe(data => {
      this.user = data;
      if (this.user.friends.length > 0) {
        this.getFriends(this.user.friends);
      }
    });
  }

  getFriends(friendsArray) {
    this.http.postItem(friendsArray, '/users/friends').subscribe(data => {
      this.friends = data;

    });
  }

  findFriend(event) {
    this.friend = undefined;
    this.errorFriend = false;

    this.http.getItem('/users/friend/' + event.target.value).subscribe( data => {
      if (this.user._id !== data[0]._id && !this.user.friends.includes(data[0]._id)) {
        this.friend = data[0];
      }
    }, err => {
      this.errorFriend = true;
    });
  }
}
