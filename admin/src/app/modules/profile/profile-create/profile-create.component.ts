import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../core/http/http.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.sass']
})
export class ProfileCreateComponent implements OnInit {

  profileImage = {
    _id: '',
    imgUrl: ''
  };

  file: File = null;
  imgUrl: string;

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit() {}

  createProfileImage() {
    const image = new FormData();
    image.append('imgUrl', this.file);

    this.http.postItem(image, 'upload').subscribe( data => {
      this.profileImage.imgUrl = data.imgUrl;
      this.http.postItem(this.profileImage, 'upload/profile').subscribe( newProfilImg => {
        this.router.navigate(['/profile']);
      },
      err => {
        console.log(err);
      });
    },
    err => {
      console.log(err);
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = (event.target.files[0] as File);
    }
  }

}
