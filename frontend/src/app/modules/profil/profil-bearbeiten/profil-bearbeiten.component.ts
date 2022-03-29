import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService} from '../../../core/http/http.service';
import { AuthService} from '../../../core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-profil-bearbeiten',
  templateUrl: './profil-bearbeiten.component.html',
  styleUrls: ['./profil-bearbeiten.component.sass']
})
export class ProfilBearbeitenComponent implements OnInit {

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
  profilForm = new FormGroup({
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

  constructor(private http: HttpService, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.http.getItem('/users/' + this.auth.getCurrentUserId()).subscribe(data => {
      this.user = data;
      this.profilForm.patchValue({
        email: this.user.email,
        username: this.user.username
      });
    });
  }

  get email() { return this.profilForm.get('email'); }
  get username() { return this.profilForm.get('username'); }

  saveProfil() {
    this.error = false;

    this.user.email = this.email.value;
    this.user.username = this.username.value;

    this.http.putItem(this.user, '/users/profil/' + this.auth.getCurrentUserId()).subscribe( data => {
    },
    err => {
      console.log(err);
      this.error = true;
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

}
