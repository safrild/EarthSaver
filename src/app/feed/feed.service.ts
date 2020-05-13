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
  myPosts: Post[] = [];

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

  getPosts() {
    this.subs = this.firebaseService.getPosts().subscribe(data => {
      this.posts = [];
      for (const post of data) {
        this.posts.push(post);
      }
    });
  }

  // TODO: finish.. or delete :)
  async getMyPosts() {
    await this.getPosts();
    for (const p of this.posts) {
      if (p.username === this.authService.getUser().email) {
        this.myPosts.push(p);
        console.log('ez a te posztod volt, beleraktam');
      }
    }
    return this.myPosts;
  }


}
