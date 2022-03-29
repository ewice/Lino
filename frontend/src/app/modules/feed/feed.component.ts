import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { FeedPost } from 'src/app/shared/models/feed-post';
import { ProjectDetail } from 'src/app/shared/models/project-detail';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  feedPosts: FeedPost[];
  activeProjects: ProjectDetail[];
  someArray: any[];
  user: User;
  loaded = false;

  constructor(private http: HttpService, private router: Router) {
    this.activeProjects = [];
    this.someArray = [];
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.http.getItem('/users/' + localStorage.getItem('userId')).subscribe(user => {
      this.user = user;
      this.http.postItem(user, '/feedPost/friendbulkAllPosts').subscribe(feedPosts => {
        this.feedPosts = feedPosts;
        feedPosts.forEach(el => {
          let fp = new FeedPost();
          fp = el;
          this.someArray.push(fp);
        });
        this.someArray.reverse();
        this.loaded = true;
      });
    });
  }

  checkType(item) {
    if (item.projectStart) {
      return true;
    } else {
      return false;
    }
  }

  navigate(id) {
    this.router.navigateByUrl('/projekte/detail/' + id);
  }
}
