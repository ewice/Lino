import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../core/http/http.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.sass']
})
export class CategoryCreateComponent implements OnInit {

  category: Category = {
    _id: '',
    title: '',
    description: '',
    imgUrl: ''
  };

  categoryForm = new FormGroup({
    title: new FormControl(
      '', [
        Validators.minLength(1),
        Validators.required
      ]
    ),
    description: new FormControl(
      '', [
        Validators.minLength(1),
        Validators.required
      ]
    )
  });

  file: File = null;

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit() {}

  get title() { return this.categoryForm.get('title'); }
  get description() { return this.categoryForm.get('description'); }

  createCategory() {
    const image = new FormData();
    image.append('imgUrl', this.file);

    this.category.title = this.title.value;
    this.category.description = this.description.value;

    this.http.postItem(image, 'upload').subscribe( data => {

      this.category.imgUrl = data.imgUrl;

      this.http.postItem(this.category, 'category').subscribe( newCategory => {
        this.router.navigate(['/category']);
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
