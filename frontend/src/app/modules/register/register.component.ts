import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService} from '../../core/http/http.service';
import { AuthService} from '../../core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import { RegisterService } from 'src/app/core/services/register.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  lockedIn = false;
  errorEmail: boolean;
  errorUsername: boolean;

  user: User = {
    _id: undefined,
    token: undefined,
    username: undefined,
    firstname: undefined,
    email: undefined,
    password: undefined,
    profilImageUrl: undefined,
    birthyear: undefined,
    activeProjects: [{pid: ''}],
    finishedProjects: [{pid: ''}],
    favProjects: [],
    friends: [],
    invitations: [],
  };
  signupForm = new FormGroup({
    email: new FormControl(
      '', [
        Validators.required,
        Validators.email
      ]
    ),
    username: new FormControl(
      '', [
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required
      ]
    )
  });

  constructor(private http: HttpService, private router: Router, private register: RegisterService) { }

  ngOnInit() {}

  get email() { return this.signupForm.get('email'); }
  get username() { return this.signupForm.get('username'); }

  async setUserData() {
    this.user.email = this.email.value;
    this.user.username = this.username.value;

    forkJoin(
      this.http.postItem(this.user, '/users/email'),
      this.http.postItem(this.user, '/users/username')
    ).subscribe( data => {
      this.register.setLocalUser(this.user);
      this.router.navigate(['/register/password']);
    },
    err => {
      err.error.err === 'email' ? this.errorEmail = true : this.errorEmail = false;
      err.error.err === 'username' ? this.errorUsername = true : this.errorUsername = false;
    });
  }
}
