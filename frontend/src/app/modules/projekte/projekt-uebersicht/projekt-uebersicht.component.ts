import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/http/http.service';
import { Project } from 'src/app/shared/models/project';
import { ProjectDetail } from 'src/app/shared/models/project-detail';
import { DataService } from 'src/app/core/data/data.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-projekt-uebersicht',
  templateUrl: './projekt-uebersicht.component.html',
  styleUrls: ['./projekt-uebersicht.component.sass']
})
export class ProjektUebersichtComponent implements OnInit {
  id: string;
  projekte = [];
  category: Category;

  constructor(private router: Router, private http: HttpService, private data: DataService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getCategory();
  }

  getCategory() {
    const urlArray: Array<string> = this.router.url.split('/');
    this.id = urlArray[urlArray.length - 1];
    this.http.getItem('/category' + '/' + this.id).subscribe(data => {
      this.category = data;
      this.getProjectsOfCategory(data);
    });
  }

  getProjectsOfCategory(cat) {
    this.http.postItem(cat.projects , '/project/bulk').subscribe(data => {
      data.forEach(element => {
        this.projekte.push(element);
      });
    });
  }

  navigate(id) {
    this.router.navigate(['/projekte/detail/' + id]);
  }
}
