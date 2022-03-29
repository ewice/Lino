import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { Category } from 'src/app/shared/models/category';
import { DataService } from 'src/app/core/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projekt-kategorien',
  templateUrl: './projekte.component.html',
  styleUrls: ['./projekte.component.sass']
})
export class ProjekteComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private http: HttpService,
    private router: Router,
    private data: DataService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.http.getItem('/category').subscribe(data => {
      data.forEach(element => {
        this.categories.push(element);
      });
    });
  }

  navigate(cat: Category) {
    this.data.passedCategory = cat;
    // tslint:disable-next-line:no-string-literal
    this.router.navigate(['/projekte/' + cat['_id']]);
  }
}
