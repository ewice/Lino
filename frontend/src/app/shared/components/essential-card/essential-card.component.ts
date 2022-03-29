import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-essential-card',
  templateUrl: './essential-card.component.html',
  styleUrls: ['./essential-card.component.sass']
})
export class EssentialCardComponent implements OnInit {
  @Input() materials;
  @Input() name;
  constructor() { }

  ngOnInit() {
  }

}
