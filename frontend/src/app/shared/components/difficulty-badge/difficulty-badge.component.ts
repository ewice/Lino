import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-difficulty-badge',
  templateUrl: './difficulty-badge.component.html',
  styleUrls: ['./difficulty-badge.component.sass']
})
export class DifficultyBadgeComponent implements OnInit {
  @Input() difficulty = 0;
  constructor() { }

  ngOnInit() {
  }

}
