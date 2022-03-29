import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService} from '../../../core/http/http.service';
import { AuthService} from '../../../core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-register-passwort',
  templateUrl: './register-passwort.component.html',
  styleUrls: ['./register-passwort.component.sass']
})
export class RegisterPasswortComponent implements OnInit {

  error = false;
  hide1 = true;
  hide2 = true;

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

  constructor(private router: Router, private register: RegisterService) { }

  ngOnInit() {}

  get password() { return this.signupForm.get('password'); }
  get passwordConfirm() { return this.signupForm.get('passwordConfirm'); }

  async setUserData() {
    this.error = false;
    if (this.password.value === this.passwordConfirm.value) {
      this.user.password = this.password.value;
      await this.register.setLocalUser(this.user);
      this.router.navigate(['/register/picture']);
    } else {
      this.error = true;
    }
  }
}
