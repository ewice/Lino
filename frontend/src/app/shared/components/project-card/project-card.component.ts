import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';
import { HttpService } from 'src/app/core/http/http.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutePipe'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value: number): string {
    const  temp = value * 60;
    const hours = Math.floor((temp / 3600));
    const minutes = value % 60;

    if (minutes < 10){
      return hours + ':' + '0' + minutes;
    } else {
      return hours + ':' + minutes;
    }
  }
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.sass']
})
export class ProjectCardComponent implements OnInit {
  @Input() element;
  cat: Category[];
  constructor(private api: HttpService) {
  }

  ngOnInit() {
    this.getAllCategories(this.element.categories);
  }
  getAllCategories(categories: string[]) {
    this.api.postItem(categories, '/category/bulk').subscribe(data => {
      this.cat = data;
    })
  }
}
