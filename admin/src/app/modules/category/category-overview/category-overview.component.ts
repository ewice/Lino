import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.sass']
})
export class CategoryOverviewComponent implements OnInit {

  categories = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.http.getItem('category').subscribe( data => {
      this.categories = data;
    });
  }

  deleteCategory(category) {
    this.http.deleteItem(category, 'category/' + category._id).subscribe( data => {
    });
  }

}
