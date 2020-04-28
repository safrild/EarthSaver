import {Router} from '@angular/router';
import {Injectable, OnDestroy} from '@angular/core';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import {FirebaseService} from '../firebase.service';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class AuthService implements OnDestroy {
  // erdemes a tipust atirni majd
  authChange = new Subject<boolean>();
  private user: User;
  subs: Subscription;
  correctMail: string = '';
  correctPsw: string = '';

  constructor(public router: Router, private firebaseService: FirebaseService) {
  }

  registerUser(authData: AuthData) {
    this.subs = this.firebaseService.getUsers().subscribe(data => {
      for (const user of data) {
        if (user.email === authData.email) {
          this.correctMail = 'Helytelen e-mail cim';
        }
      }
      if (this.correctMail === '') {
        this.user = {
          email: authData.email,
          password: authData.password,
          hometown: 'Csongrad'
        };

        this.firebaseService.addUser(this.user);
        this.authChange.next(true);
        this.router.navigate(['/feed']);
      }
    });
  }

  login(authData: AuthData) {
    this.subs = this.firebaseService.getUsers().subscribe(data => {
      for (const user of data) {
        if (user.email === authData.email) {
          if (user.password === authData.password) {
            this.user = {
              email: authData.email,
              password: authData.password,
              hometown: 'vmi'
            };
            this.authChange.next(true);
            this.router.navigate(['/feed']);
            break;
          } else if (user.email === authData.email && user.password !== authData.password ) {
            this.correctPsw = 'Helytelen jelszo';
          }
        } else {
          this.correctMail = 'Helytelen e-mail cim';
        }
      }
    });
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/']); // vissza a welcome componentre
  }

  getUser() {
    return {...this.user}; // igy nem referenciat adunk at neki, csak erteket
  }

  isAuth() {
    return this.user != null;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
