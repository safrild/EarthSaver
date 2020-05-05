import {Router} from '@angular/router';
import {Injectable, OnDestroy} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {PostData} from './post-data.model';
import {Post} from './post.model';

@Injectable()
export class FeedService {

  constructor(private router: Router, private firebaseService: FirebaseService) {
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
