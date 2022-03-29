import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) {

  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token === undefined) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentUserId(): string {
    return localStorage.getItem('userId');
  }

  getCurrentUserToken(): string {
    return localStorage.getItem('token');
  }
}
