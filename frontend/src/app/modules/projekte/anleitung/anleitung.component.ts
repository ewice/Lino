import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { Step } from 'src/app/shared/models/step';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectDetail } from 'src/app/shared/models/project-detail';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { FeedPost } from 'src/app/shared/models/feed-post';

@Component({
  selector: 'app-anleitung',
  templateUrl: './anleitung.component.html',
  styleUrls: ['./anleitung.component.sass']
})
export class AnleitungComponent implements OnInit {
  steps: Step[];
  project: ProjectDetail;
  stepCounter = 0;
  user: User;
  projectIsActive: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, private api: HttpService, private auth: AuthService) {
    this.api.getItem('/users/' + this.auth.getCurrentUserId()).subscribe(user => {
      this.user = user;
    });
    const pathArray = this.router.url.split('/');
    const projectId = pathArray[pathArray.length - 2];


    this.http.getItem('/project/' + projectId, ).subscribe( data => {
      this.steps = data.steps;
      this.project = data;
      this.checkIfProjectIsActive();
      if (this.activatedRoute.snapshot.params.x) {
        this.projectIsActive = this.activatedRoute.snapshot.params.x;
      }
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
    })
  }

  startProject() {

      this.checkIfProjectIsActive().then(() => {
        if (!this.projectIsActive) {
          this.user.activeProjects.push({
            pid: this.project._id,
            startTime: Date.now()
          })
          this.updateUser();
          this.createFeedPost();
          this.projectIsActive = true;
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
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
v

  updateUser() {
    this.api.putItem(this.user, '/users/' + this.user._id).subscribe(data => {
    });
  }

  stopProject() {
    this.checkIfProjectIsActive().then(() => {
      if (this.projectIsActive) {
        this.user.activeProjects.forEach(el => {
          if (el.pid === this.project._id) {
            this.user.activeProjects.splice(this.user.activeProjects.indexOf(el), 1);
            this.user.finishedProjects.push({pid: el.pid, endTime: Date.now()})
            this.updateUser();
            this.projectIsActive = false;
            this.router.navigate(['projekte/detail/' + this.project._id +'/ende']);

          }
        })
      }

    });
  }


}
