import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './auth/user.model';
import {Post} from './feed/post.model';
import {Observable} from 'rxjs/Observable';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore) {
  }

  addUser(user: User) {
    return this.afs.collection('Users').add(user);
  }

  getUsers() {
    return this.afs.collection<User>('Users').valueChanges();
  }

  addPost(post: Post) {
    return this.afs.collection('Posts').add(post);
  }

  getPosts(): Observable<any> {
    console.log('firebaseservice getPosts()');
    return this.afs.collection<Post>('Posts').valueChanges();
  }
}
