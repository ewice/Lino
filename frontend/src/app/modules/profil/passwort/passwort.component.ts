import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService} from '../../../core/http/http.service';
import { AuthService} from '../../../core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-passwort',
  templateUrl: './passwort.component.html',
  styleUrls: ['./passwort.component.sass']
})
export class PasswortComponent implements OnInit {

  lockedIn = false;
  error = false;
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

  passwordForm = new FormGroup({
    oldPassword: new FormControl(
      '', [
        Validators.minLength(7),
        Validators.maxLength(25),
        Validators.required
      ]
    ),
    password: new FormControl(
      '', [
        Validators.minLength(7),
        Validators.maxLength(25),
        Validators.required
      ]
    ),
    passwordConfirm: new FormControl(
      '', [
        Validators.minLength(7),
        Validators.maxLength(25),
        Validators.required
      ]
    )
  });

  constructor(private http: HttpService, private router: Router, private auth: AuthService) { }

  ngOnInit() {}

  get oldPassword() { return this.passwordForm.get('oldPassword'); }
  get password() { return this.passwordForm.get('password'); }
  get passwordConfirm() { return this.passwordForm.get('passwordConfirm'); }

  savePassword() {
    this.error = false;
    if (this.password.value === this.passwordConfirm.value) {
      // tslint:disable-next-line:max-line-length
      this.http.postItem( { oldPassword: this.oldPassword.value }, '/users/password/' + this.auth.getCurrentUserId()).subscribe( userData => {
        userData.password = this.password.value;
        this.http.putItem(userData, '/users/password/' + this.auth.getCurrentUserId()).subscribe( data => {
          this.router.navigate(['/profil/edit']);
        });
      },
      err => {
        this.error = true;
      });
    }
  }
}
