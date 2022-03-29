import { Component, OnInit, Input } from '@angular/core';
import { ProjectDetail } from '../../models/project-detail';
import { User } from '../../models/user';
import { FeedPost } from '../../models/feed-post';
import { HttpService } from 'src/app/core/http/http.service';
import * as moment from 'moment';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-begin-card',
  templateUrl: './project-begin-card.component.html',
  styleUrls: ['./project-begin-card.component.sass']
})
export class ProjectBeginCardComponent implements OnInit {
  @Input() element: any;
  @Input() user: User;
  time: any;

  constructor(private http: HttpService) {}

  ngOnInit() {
    if (!this.user) {
      this.http.getItem('/users/' + this.element.author).subscribe(u => {
        this.user = u;
      });
    }

    if (!(this.element instanceof ProjectDetail)) {
      this.time = this.element.creationDate;
      this.http.getItem('/project/' + this.element.projectId).subscribe(p => {
        this.element = p;
       // this.time = this.user.activeProjects.find(project => project.pid === this.element._id)?.startTime;
      });
    }
    if (this.element.categories) {
       this.time = this.user.activeProjects.find(project => project.pid === this.element._id)?.startTime;

    }
  }

}
