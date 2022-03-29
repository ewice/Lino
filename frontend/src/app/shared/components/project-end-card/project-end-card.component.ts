import { Component, OnInit, Input } from '@angular/core';
import { FeedPost } from '../../models/feed-post';
import { User } from '../../models/user';
import { HttpService } from 'src/app/core/http/http.service';
import { ProjectDetail } from '../../models/project-detail';
import * as moment from 'moment';

@Component({
  selector: 'app-project-end-card',
  templateUrl: './project-end-card.component.html',
  styleUrls: ['./project-end-card.component.sass']
})
export class ProjectEndCardComponent implements OnInit {
  @Input() friendResults: FeedPost;
  @Input() user: User;
  time: any;
  author: User;
  project: ProjectDetail;

  constructor(private http: HttpService) {}

  ngOnInit() {
    if (this.user) {
      this.time = this.user.finishedProjects.find(project => project.pid === this.friendResults.projectId)?.endTime;
    }

    this.http.getItem('/users/' + this.friendResults.author).subscribe(user => {
      this.author = user;

      if (!this.user) {
        this.time = this.author.finishedProjects.find(project => project.pid === this.friendResults.projectId)?.endTime;
        this.http.getItem('/project/' + this.friendResults.projectId).subscribe(project => this.project = project);
      }

    });

  }

}
