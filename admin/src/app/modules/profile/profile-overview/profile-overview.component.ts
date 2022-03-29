import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.sass']
})
export class ProfileOverviewComponent implements OnInit {

  profileImages = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getProfileImages();
  }

  getProfileImages() {
    this.http.getItem('upload/profile').subscribe( data => {
      this.profileImages = [];
      this.profileImages = data;
    });
  }

  deleteProfileImage(image) {
    this.http.deleteItem(image, 'upload/' + image._id).subscribe( data => {
      this.getProfileImages();
    });
  }
}
