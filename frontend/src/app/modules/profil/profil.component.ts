import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Project } from 'src/app/shared/models/project';
import { Router } from '@angular/router';
import { ProjectDetail } from 'src/app/shared/models/project-detail';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.sass']
})
export class ProfilComponent implements OnInit {

  user: User;
  friend: boolean;
  activeProjekts: ProjectDetail[] = [];
  finishedProjekts = [];
  startedTaks = true;
  id: string;

  constructor(private http: HttpService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    const urlArray: Array<string> = this.router.url.split('/');
    if (urlArray[urlArray.length - 1] !== 'profil') {
      this.id = urlArray[urlArray.length - 1];
    }

    if (this.id !== undefined) {
      this.http.getItem('/users/friendId/' + this.id).subscribe(data => {
        this.user = data[0];
        this.friend = true;
        if (this.user.activeProjects.length > 0 || this.user.finishedProjects.length > 0) {
          this.getAktiveProjekts(this.user.activeProjects);
          this.getUsersFeedPosts(this.user._id);
        }
      });
    } else {
      this.http.getItem('/users/' + this.auth.getCurrentUserId()).subscribe(data => {
        this.user = data;
        if (this.user.activeProjects.length > 0 || this.user.finishedProjects.length > 0) {
          this.getAktiveProjekts(this.user.activeProjects);
          this.getUsersFeedPosts(this.user._id);
        }
      });
    }
  }

  getUsersFeedPosts(uid) {
    this.http.getItem('/feedPost/profile/' + uid ).subscribe(data => {
      this.finishedProjekts = data;
      this.finishedProjekts.reverse();
    });
  }

  getAktiveProjekts(projectIds) {
    const activeProjectsArray = [];
    projectIds.forEach(element => {
      activeProjectsArray.push(element.pid);
    });
    this.http.postItem(activeProjectsArray, '/project/bulk')
    .subscribe(ap => {
      this.activeProjekts = ap;
      this.activeProjekts.reverse();
    });
  }

  toggleStartedTask(status: boolean) {
    this.startedTaks = status;
  }

  navigate(id) {
    this.router.navigate(['/projekte/detail/' + id]);
  }
}
