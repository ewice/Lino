import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.sass']
})
export class ProjectOverviewComponent implements OnInit {

  projects: Project[] = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.http.getItem('project').subscribe( data => {
      this.projects = data;
    });
  }

}
