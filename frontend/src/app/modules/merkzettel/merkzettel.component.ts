import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { Router } from '@angular/router';
import { PinService } from 'src/app/core/pin/pin.service';
import { ProjectDetail } from 'src/app/shared/models/project-detail';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';


@Component({
  selector: 'app-merkzettel',
  templateUrl: './merkzettel.component.html',
  styleUrls: ['./merkzettel.component.sass']
})
export class MerkzettelComponent implements OnInit {
  id: string;
  user: User;
  pinnedProjects = [];
  project: ProjectDetail;
  amountPinnedProjects: number;
  loaded = false;

  constructor(
    private http: HttpService,
    private router: Router,
    private pinService: PinService,
    private auth: AuthService
  ) {
    this.pinService.pinStatus = true;
    this.pinService.getPinStatus();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.http.getItem('/users/' + this.auth.getCurrentUserId()).subscribe( data => {
      this.user = data;
      this.getPinnedProjects();
    });
  }

  getPinnedProjects() {
      this.http.postItem(this.user.favProjects, '/project/bulk').subscribe(pinnedProjects => {
        this.pinnedProjects = [];
        this.pinnedProjects = pinnedProjects;
        this.amountPinnedProjects = pinnedProjects.length;
        this.loaded = true;
      });
  }

  navigate(id) {
    this.router.navigate(['/projekte/detail/' + id]);
  }

  removeProject(project) {
    this.pinService.changePinStatus(project._id);
    this.pinnedProjects.splice(this.pinnedProjects.indexOf(project), 1);
    this.amountPinnedProjects = this.pinnedProjects.length;
  }
}
