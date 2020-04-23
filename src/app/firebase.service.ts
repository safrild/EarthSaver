import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  myUser: User = {
    email: 'valami@valamicske.hu',
    password: 'kuki',
    hometown: 'Szeged',
  };

  constructor(private afs: AngularFirestore) {

  }

  addUser(user: User) {
    return this.afs.collection('Users').add(user);
  }

  /* get users
  this.afs.collection<User>('Users').valueChanges();
  erre subscribe-olni kell
   */

  getUsers() {
    return this.afs.collection<User>('Users').valueChanges();
  }
}
