import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService} from '../../core/http/http.service';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  lockedIn = false;
  error = false;
  hide = true;
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
  loginForm = new FormGroup({
    email: new FormControl(
      '', [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl(
      '', [
        Validators.minLength(7),
        Validators.maxLength(25),
        Validators.required
      ]
    )
  });

  constructor(private http: HttpService, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    this.error = false;
    this.user.email = this.email.value;
    this.user.password = this.password.value;

    this.http.postItem(this.user, '/users/login').subscribe( data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data._id);
      this.auth.isAuthenticated();
      this.router.navigate(['']);
    },
    err => {
      this.error = true;
      console.log(err);
    });
  }



}
