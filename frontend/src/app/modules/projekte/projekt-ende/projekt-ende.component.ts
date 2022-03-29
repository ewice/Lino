import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/http/http.service';
import { ProjectDetail } from 'src/app/shared/models/project-detail';
import { Project } from 'src/app/shared/models/project';
import { Subject, Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { FeedPost } from 'src/app/shared/models/feed-post';

@Component({
  selector: 'app-projekt-ende',
  templateUrl: './projekt-ende.component.html',
  styleUrls: ['./projekt-ende.component.sass']
})
export class ProjektEndeComponent implements OnInit {
  @ViewChild('posttextvalue') textarea: ElementRef;
  projectId: string;
  project: ProjectDetail;
  hasVoted = false;
  compNr: number;
  camVisible = 0;
  public webcamImage: WebcamImage = null;

  private trigger: Subject<void> = new Subject<void>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private api: HttpService) {
    this.compNr = 0;
    this.activatedRoute.params.subscribe(data => {
      this.projectId = data.projectId;
      this.api.getItem('/project/' + data.projectId).subscribe(pro => {
        this.project = pro;
      });
    });
   }

  ngOnInit() {
    window.scrollTo(0, 0);
  }


  public get triggerObservable(): Observable<void> {


    return this.trigger.asObservable();
  }

  vote(v: number) {
    this.compNr = 1;
    if (v === 1) {
      this.likeProject();
    }
  }

  likeProject() {
    if (this.project.likes.indexOf(localStorage.getItem('userId')) === -1) {
      this.project.likes.push(localStorage.getItem('userId'));
      this.updateProject(this.project);
    }
    //  else {
    //   this.project.likes.splice(this.project.likes.indexOf(localStorage.getItem('userId')));
    //   this.updateProject(this.project);
    // }

  }

  updateProject(p: ProjectDetail) {
    this.api.putItem(p, '/project/' + p._id).subscribe(data => console.log(data));
  }

  addPhoto() {
    if (this.camVisible === 0) {
      this.camVisible = 1;
    } else if (this.camVisible === 1) {
      this.trigger.next();
      this.camVisible = 2;
    } else if (this.camVisible === 2 ) {
      this.camVisible = 1;

    }
  }


  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  finishPhoto() {
    this.compNr = 2;
  }

  dataURItoBlob(dataURI): Blob {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.toString().split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.toString().split(',')[1]);
    } else {
      byteString = unescape(dataURI.toString().split(',')[1]);
    }
    // separate out the mime component
    const mimeString = dataURI.toString().split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }




    return new Blob([ia], {type: mimeString});
}

  sendPost() {


    const image = new FormData();
    image.append('imgUrl', this.dataURItoBlob(this.webcamImage.imageAsDataUrl), 'feedpostImg' + Date.now() + '.jpg');
    this.api.postItemFormData(image, '/upload').subscribe(data => {
      let post = new FeedPost();
      post = {
        _id: '',
        author: localStorage.getItem('userId'),
        creationDate: null,
        text: this.textarea.nativeElement.value,
        projectId: this.project._id,
        imgUrl: data.imgUrl,
        likes: [],
        projectStart: false
      };
      this.api.postItem(post, '/feedPost').subscribe(res => {
        this.project.friendResults.push(res._id);
        this.api.putItem(this.project, '/project/' + this.project._id).subscribe(a => {
        });
        this.router.navigate(['/']);
      });
    });
  }
}


