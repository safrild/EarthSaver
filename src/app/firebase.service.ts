import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  myUser: User = {
    email: 'valami@valamicske.hu',
    username: 'user001',
    hometown: 'Szeged',
  };

  constructor(private afs: AngularFirestore) {

  }

  addUser() {
    return this.afs.collection('Users').add(this.myUser);
  }
}
