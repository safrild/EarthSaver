import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './auth/user.model';
import {Post} from './feed/post.model';
import {Observable} from 'rxjs/Observable';
import {Group} from './groups/group.model';
import * as firebase from 'firebase';
import {Profile} from './profile/profile.model';

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
    return this.afs.collection<Post>('Posts').valueChanges();
  }

  getGroups() {
    return this.afs.collection<Group>('Groups').valueChanges();
  }

  addGroup(group: Group) {
    return this.afs.collection('Groups').doc(group.id).set(group);
  }

  update(group: Group, email: string) {
    return this.afs.collection('Groups').doc(group.id).set({
      name: group.name,
      description: group.description,
      posts: group.posts,
      users: firebase.firestore.FieldValue.arrayUnion(email)
    }, {merge: true});
  }

  getProfiles() {
    return this.afs.collection<Profile>('Profiles').valueChanges();
  }

  addProfile(profile: Profile) {
    return this.afs.collection('Profiles').doc(profile.id).set(profile);
  }

}
