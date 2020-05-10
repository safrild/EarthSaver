import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {Group} from './group.model';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../auth/auth.service';
import {FirebaseService} from '../firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  subs: Subscription;
  groups: Group[] = [];
  private readonly notifier: NotifierService;

  constructor(private authService: AuthService, private firebaseService: FirebaseService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }



  addGroup(groupdata: Group) {
    const group: Group = {
      id: Math.random().toString(36).substr(2, 9),
      name: groupdata.name,
      description: groupdata.description,
      users: groupdata.users,
      posts: groupdata.posts
    };
    this.firebaseService.addGroup(group);
  }

  // TODO: disabled a join gomb, ha mar benne vagy a csoportban
  onJoin(group: Group) {
    this.firebaseService.update(group, this.authService.getUser().email);
    this.notifier.notify('Success', 'You joined the group', 'joinGroupNoti');
  }

}
