import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  passedCategory: Category;

  constructor() { }

}
