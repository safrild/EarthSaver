import {Router} from '@angular/router';
import {Injectable, OnDestroy} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Subscription} from 'rxjs/Subscription';
import {PostData} from './post-data.model';
import {Post} from './post.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FeedService implements OnDestroy {
  subs: Subscription;
  private post: Post;

  constructor(private router: Router, private firebaseService: FirebaseService) {
  }

  createPost(postData: PostData) {
    console.log(postData);
    const promise = new Promise((resolve, reject) => {
      this.post = {
        username: postData.username,
        text: postData.text
        };
      this.firebaseService.addPost(this.post);
      this.router.navigate(['/feed']);
    });
    // TODO: resetelni a formot, miutan kikerult a post
  }

  // TODO: show posts
  getPosts() {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
