import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      username: authData.username,
      hometown: authData.hometown
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      username: authData.username,
      hometown: authData.hometown
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user}; // igy nem referenciat adunk at neki, csak erteket
  }

  isAuth() {
    return this.user != null;
  }

}
