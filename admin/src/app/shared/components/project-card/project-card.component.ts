import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.sass']
})
export class ProjectCardComponent implements OnInit {

  @Input() element;
  @Output() deleted = new EventEmitter();

  constructor(
    private http: HttpService,
    private router: Router) { }

  ngOnInit() {
  }

  async deleteProject(project) {
    for (const projectCategory of project.categories) {
      await this.removeIdInCategory(projectCategory, project._id);
    }

    this.http.deleteItem(project, 'project/' + project._id).subscribe(data => {
      this.deleted.emit(true);
    });
  }

  removeIdInCategory(projectCategory, projectId) {
    this.http.getItem('category', projectCategory._id).subscribe(category => {
      const index = category[0].projects.indexOf(projectId);
      category[0].projects.splice(index, 1);
      this.http.patchItem(category[0], 'category/' + category[0]._id).subscribe(updatedCategory => {
      });
    });
  }
}
