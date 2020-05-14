import {Router} from '@angular/router';
import {Injectable, OnDestroy} from '@angular/core';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import {FirebaseService} from '../firebase.service';
import {Subscription} from 'rxjs/Subscription';
import {Group} from '../groups/group.model';
import {Post} from '../feed/post.model';

@Injectable()
export class AuthService implements OnDestroy {
  authChange = new Subject<boolean>();
  private user: User;
  subs: Subscription;
  correctMail: string = '';
  correctPsw: string = '';
  myGroups: Group[] = [];
  myPosts: Post[] = [];

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
          } else if (user.email === authData.email && user.password !== authData.password) {
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
    this.router.navigate(['/']);
  }

  getUser() {
    return {...this.user}; // igy nem referenciat adunk at neki, csak erteket
  }

  isAuth() {
    return this.user != null;
  }

  getMyGroups() {
    this.subs = this.firebaseService.getGroups().subscribe(data => {
      this.myGroups = [];
      for (const g of data) {
        for (const u of g.users) {
          if (u === this.getUser().email) {
            this.myGroups.push(g);
          }
        }
      }
    });
  }

  getMyPosts() {
    this.subs = this.firebaseService.getPosts().subscribe(data => {
      this.myPosts = [];
      for (const p of data) {
        if (p.username === this.getUser().email) {
          this.myPosts.push(p);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
