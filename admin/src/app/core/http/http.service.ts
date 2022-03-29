import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../shared/models/user';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  baseUrl = 'https://linodh.herokuapp.com/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ; charset=UTF-8'
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

  getItem(type: string, id?: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + type, this.httpOptions);
  }

  postItem(item, type: string) {
    return this.http.post<any>( this.baseUrl + type, item );
  }

  patchItem(item, type: string) {
    return this.http.patch<any>( this.baseUrl + type, item, this.httpOptions );
  }

  deleteItem(item, type: string) {
    return this.http.delete<any>( this.baseUrl + type, item );
  }


  checkBaseUrl(type: string, id?: string): string {
    this.baseUrl = this.baseUrl + '/' + type;
    if (id) {
      return this.baseUrl = this.baseUrl + '/' + id;
    } else {
      return this.baseUrl;
    }
  }

}
