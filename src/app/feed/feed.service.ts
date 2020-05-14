import {Router} from '@angular/router';
import {Injectable, OnDestroy} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {PostData} from './post-data.model';
import {Post} from './post.model';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class FeedService {
  posts: Post[] = [];
  subs: Subscription;

  constructor(private router: Router, private firebaseService: FirebaseService, private authService: AuthService) {
  }

  createPost(postData: PostData) {
    console.log(postData);
    const post: Post = {
      username: postData.username,
      text: postData.text
    };
    this.firebaseService.addPost(post);
  }




}
