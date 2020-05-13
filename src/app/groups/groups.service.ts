import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {Group} from './group.model';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../auth/auth.service';
import {FirebaseService} from '../firebase.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groups: Group[] = [];
  myGroups: Group[] = [];
  private readonly notifier: NotifierService;
  groupToOpen: Group;
  subs: Subscription;

  constructor(private authService: AuthService, private firebaseService: FirebaseService, notifierService: NotifierService,
              public router: Router) {
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

  onJoin(group: Group) {
    this.firebaseService.update(group, this.authService.getUser().email);
    this.notifier.notify('Success', 'You joined the group', 'joinGroupNoti');
  }

  navigate(gto: Group) {
    this.groupToOpen = gto;
    this.router.navigate(['/group']);
  }

}
