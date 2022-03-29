import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Component({
  selector: 'app-friendrequest-card',
  templateUrl: './friendrequest-card.component.html',
  styleUrls: ['./friendrequest-card.component.sass']
})
export class FriendrequestCardComponent implements OnInit {
  @Input() request;
  @Input() invitation;
  @Output() changed = new EventEmitter();

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  addFriend() {
    this.invitation.isAccepted = true;

    this.http.putItem( this.invitation, '/invitation/' + this.invitation._id ).subscribe( () => {
      this.deleteInvitation();
    }, err => {
    });
  }

  deleteInvitation() {
    this.http.deleteItem( '/invitation/' + this.invitation._id ).subscribe( () => {
      this.changed.emit(true);
    });
  }
}
