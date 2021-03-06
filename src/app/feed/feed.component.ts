import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';
import {FeedService} from './feed.service';
import {Post} from './post.model';
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription: Subscription;
  posts: Post[] = [];
  subs: Subscription;

  constructor(private authService: AuthService, private firebaseService: FirebaseService) {
  }

  async ngOnInit() {
    this.posts = [];
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.getPosts();
    await this.authService.getMyGroups();
    await this.authService.getMyPosts();
  }

  // TODO: kattinthato posztok, hogy a profilra vigyenek
  getPosts() {
    this.subs = this.firebaseService.getPosts().subscribe(data => {
      this.posts = [];
      for (const post of data) {
        this.posts.push(post);
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.posts = [];
  }


}

