import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.sass']
})
export class CategoryCardComponent implements OnInit {
  @Input() element;
  @Output() deleted = new EventEmitter();

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  deleteCategory(category) {
    this.http.deleteItem(category, 'category/' + category._id).subscribe( data => {
      this.deleted.emit(true);
    });
  }
}
