import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Subscription} from 'rxjs/Subscription';
import {Group} from './group.model';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy {
  subs: Subscription;
  isAuth = false;
  authSubscription: Subscription;
  groups: Group[] = [];
  groupForm: FormGroup;
  private readonly notifier: NotifierService;
  newgroup = false;

  constructor(private authService: AuthService, private firebaseService: FirebaseService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.groupForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      description: new FormControl('', {
        validators: [Validators.required]
      })
    });
    this.getGroups();
  }

  getGroups() {
    this.subs = this.firebaseService.getGroups().subscribe(data => {
      this.groups = [];
      for (const group of data) {
        this.groups.push(group);
      }
    });
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

  onSubmit() {
    this.addGroup({
      id: Math.random().toString(36).substr(2, 9),
      name: this.groupForm.value.name,
      description: this.groupForm.value.description,
      users: [],
      posts: []
    });
    this.groupForm.reset();
    this.notifier.notify('Success', 'Group added successfully', 'addGroupNoti');
  }

  onJoin(group: Group) {
    this.firebaseService.update(group, this.authService.getUser().email);
    this.notifier.notify('Success', 'You joined the group', 'joinGroupNoti');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  newGroup() {
    this.newgroup = true;
  }
}
