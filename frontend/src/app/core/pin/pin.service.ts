import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { DetailComponent } from 'src/app/modules/detail/detail.component';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../authentication/auth.service';
import { ProjectDetail } from 'src/app/shared/models/project-detail';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  pinStatus: boolean;
  project: ProjectDetail;
  user: User;

  constructor(
    private http: HttpService,
    private auth: AuthService
  ) {

  }

  changePinStatus(projectId) {
    this.pinStatus = !this.pinStatus;
    if (this.user.favProjects.indexOf(projectId) >= 0) {
      this.unpinProject(projectId);
    } else {
      this.pinProject(projectId);
    }
  }

  getPinStatus(projectId?) {
    this.http.getItem('/users/' + this.auth.getCurrentUserId()) // http get und post gibt immer Observable zurück
      .subscribe(user => {     // mit Subscribe greift man auf Objekte im Observable zu
        this.user = user;             // und macht die Objekte verfügbar
        if (projectId) {
          if (this.user.favProjects.indexOf(projectId) >= 0) {
            this.pinStatus = true;
          } else {
            this.pinStatus = false;
          }
        }
      });
  }


  pinProject(projectId) {
    this.user.favProjects.push(projectId);
    this.updateUser();
  }

  unpinProject(projectId) {
    let index = this.user.favProjects.indexOf(projectId);
    this.user.favProjects.splice(index, 1);
    this.updateUser();
  }

  updateUser() {
    this.http.putItem(this.user, '/users/' + this.user._id).subscribe(data => {
      })
  }


}
