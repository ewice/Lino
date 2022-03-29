import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../shared/models/user';
import { AuthService } from '../authentication/auth.service';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  baseUrl = 'https://linodh.herokuapp.com';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ; charset=UTF-8',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };
  httpOptionsFormData = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { }

  getItem(type: string): Observable<any> {
     return this.http.get(this.baseUrl + type, this.httpOptions);
  }

  postItem(item, type: string): Observable<any> {
    return this.http.post(this.baseUrl + type, item, this.httpOptions);
  }

  postItemFormData(item, type: string): Observable<any> {
    return this.http.post(this.baseUrl + type, item, this.httpOptionsFormData);
  }

  putItem(item, type: string): Observable<any> {
    return this.http.put<any>( this.baseUrl + type, item, this.httpOptions );
  }

  deleteItem(type: string) {
    return this.http.delete<any>( this.baseUrl + type, this.httpOptions );
  }

}
