import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Group} from './group.model';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {GroupsService} from './groups.service';
import {FirebaseService} from '../firebase.service';

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

  constructor(private authService: AuthService, private groupService: GroupsService, notifierService: NotifierService,
              private firebaseService: FirebaseService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.groups = [];
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

  onSubmit() {
    this.groupService.addGroup({
      id: Math.random().toString(36).substr(2, 9),
      name: this.groupForm.value.name,
      description: this.groupForm.value.description,
      users: [],
      posts: []
    });
    this.groupForm.reset();
    this.notifier.notify('success', 'Group added successfully');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.authSubscription.unsubscribe();
    this.groups = [];
  }

  newGroup() {
    this.newgroup = true;
  }

  amIIn(g: Group) {
    return g.users.includes(this.authService.getUser().email);
  }
}
