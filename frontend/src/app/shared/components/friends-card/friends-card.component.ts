import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friends-card',
  templateUrl: './friends-card.component.html',
  styleUrls: ['./friends-card.component.sass']
})
export class FriendsCardComponent implements OnInit {
  @Input() friend;

  constructor() { }

  ngOnInit() {
  }

}
