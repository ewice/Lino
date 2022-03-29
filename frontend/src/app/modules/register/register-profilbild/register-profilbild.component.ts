import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { User } from 'src/app/shared/models/user';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-register-profilbild',
  templateUrl: './register-profilbild.component.html',
  styleUrls: ['./register-profilbild.component.sass']
})
export class RegisterProfilbildComponent implements OnInit {

  profilImages = [];
  profilImageUrl: string;
  error = false;

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

  constructor(
    private http: HttpService, private elem: ElementRef, private register: RegisterService) { }

  ngOnInit() {
    this.http.getItem('/upload/profile').subscribe( data => {
      this.profilImages = data;
    });

  }

  selectImage(imgUrl, event) {
    this.profilImageUrl = imgUrl;
    const profilImages = this.elem.nativeElement.querySelectorAll('.profil-images');

    for (const image of profilImages) {
      if ( image === event.target) {
        image.classList.remove('not-selected');
        event.target.id = 'selected';
      } else {
        image.classList.add('not-selected');
        image.removeAttribute('id');
      }
    }
  }

  async saveImgInProfil() {
    if (this.profilImageUrl === undefined) {
      this.error = true;
    } else {
      this.error = false;
      this.user.profilImageUrl = this.profilImageUrl;
      await this.register.setLocalUser(this.user);
      this.register.register();
    }
  }

}
