import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/http/http.service';
import { ProjectDetail } from 'src/app/shared/models/project-detail';
import { Category } from 'src/app/shared/models/category';
import { FeedPost } from 'src/app/shared/models/feed-post';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import { PinService } from 'src/app/core/pin/pin.service';
import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutePipe'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value: number): string {
    const  temp = value * 60;
    const hours = Math.floor((temp / 3600));
    const minutes = value % 60;

    if (minutes < 10){
      return hours + ':' + '0' + minutes;
    } else {
      return hours + ':' + minutes;
    }
  }
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  id: string;
  project: ProjectDetail;
  categories: Category[];
  feedPosts: FeedPost[];
  stepUrl: string;
  user: User;

  projectIsActive = false;

  constructor(private http: HttpService, private router: Router, private auth: AuthService, public pinService: PinService) {
    const urlArray: Array<string> = this.router.url.split('/');
    this.id = urlArray[urlArray.length - 1];
    this.stepUrl = '/projekte/detail/' + this.id + '/step';

    this.http.getItem('/users/' + this.auth.getCurrentUserId()).subscribe(user => {
      this.user = user;

      this.http.getItem('/project/' + this.id).subscribe(data => {
        this.project = data;
        this.checkIfProjectIsActive();
        this.pinService.getPinStatus(this.project._id);
        this.http.postItem(data.categories, '/category/bulk').subscribe(category => {
          this.categories = category;
        });

        this.http.postItem({fr: data.friendResults, user: this.user}, '/feedPost/friendbulk').subscribe(friendRes => {
          this.feedPosts = friendRes;
        });
      });
    });

  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  async checkIfProjectIsActive() {
    this.user.activeProjects.forEach(obj => {
      if (obj.pid === this.project._id) {
        this.projectIsActive = true;
        return;
      } else {
        this.projectIsActive = false;

      }
    });
  }

  startProject() {
    this.checkIfProjectIsActive().then(() => {
      if (!this.projectIsActive) {
        this.user.activeProjects.push({
          pid: this.project._id,
          startTime: Date.now(),
        });
        this.updateUser();
        this.createFeedPost();
        this.projectIsActive = true;
        this.router.navigate([this.stepUrl, {x: true}]);
      }
    });
  }

createFeedPost() {
  let post = new FeedPost();
  post = {
    _id: '',
    author: localStorage.getItem('userId'),
    creationDate: null,
    text: '',
    projectId: this.project._id,
    imgUrl: this.project.imgUrl,
    likes: [],
    projectStart: true
  };
  this.http.postItem(post, '/feedPost').subscribe(res => {
      console.log(res);
    })
}

  updateUser() {
    this.http.putItem(this.user, '/users/' + this.user._id).subscribe( data => {
    });
  }

  stopProject() {
    this.checkIfProjectIsActive().then(() => {
      if (this.projectIsActive) {
        this.user.activeProjects.forEach(el => {
          if (el.pid === this.project._id) {
            this.user.activeProjects.splice(this.user.activeProjects.indexOf(el), 1);
            this.user.finishedProjects.push({
              pid: el.pid,
              endTime: Date.now()
            });
            this.updateUser();
            this.projectIsActive = false;
            this.router.navigate(['projekte/detail/' + this.project._id + '/ende']);
          }
        });
      }
    });
  }



  changePinStatus(projectId) {
    this.pinService.changePinStatus(projectId);
  }
}
