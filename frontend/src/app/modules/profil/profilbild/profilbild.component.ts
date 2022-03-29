import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilbild',
  templateUrl: './profilbild.component.html',
  styleUrls: ['./profilbild.component.sass']
})
export class ProfilbildComponent implements OnInit {

  profilImages = [];
  profilImageUrl: string;
  error = false;

  constructor(private http: HttpService, private auth: AuthService, private router: Router, private elem: ElementRef) { }

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

  saveImgInProfil() {
    if (this.profilImageUrl === undefined) {
      this.error = true;
    } else {
      this.error = false;

      this.http.getItem('/users/' + this.auth.getCurrentUserId()).subscribe(data => {
        data.profilImageUrl = this.profilImageUrl;
        this.http.putItem(data, '/users/' + this.auth.getCurrentUserId()).subscribe( feedback => {
          this.router.navigate(['profil/edit']);
        });
      });
    }
  }

}
