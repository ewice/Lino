import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { HttpService } from '../http/http.service';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  user: User = {
    _id: '',
    token: '',
    username: '',
    firstname: '',
    email: '',
    password: '',
    profilImageUrl: '',
    birthyear: 0,
    activeProjects: [{pid: ''}],
    finishedProjects: [{pid: ''}],
    favProjects: [],
    friends: [],
    invitations: [],
  };

  constructor(private http: HttpService, private auth: AuthService, private router: Router) { }

  setLocalUser(user: User) {
    this.user.email = user.email === undefined ? this.user.email : user.email;
    this.user.username = user.username === undefined ? this.user.username : user.username;
    this.user.password = user.password === undefined ? this.user.password : user.password;
    this.user.profilImageUrl = user.profilImageUrl === undefined ? this.user.profilImageUrl : user.profilImageUrl;
  }

  register() {
    this.http.postItem(this.user, '/users/signup').subscribe( data => {
      this.http.postItem(this.user, '/users/login').subscribe( userData => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userId', userData._id);
        this.auth.isAuthenticated();
        this.router.navigate(['']);
      },
      err => {
        console.log(err);

      });
    },
    err => {
      console.log(err);
    });
  }
}
