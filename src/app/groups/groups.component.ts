import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Subscription} from 'rxjs/Subscription';
import {Group} from './group.model';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private authService: AuthService, private firebaseService: FirebaseService) {
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
      name: groupdata.name,
      description: groupdata.description,
      users: groupdata.users,
      posts: groupdata.posts
    };
    this.firebaseService.addGroup(group);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  onSubmit() {
    this.addGroup({
      name: this.groupForm.value.name,
      description: this.groupForm.value.description,
      users: ['A', 'B'],
      posts: ['Poszt1', 'Poszt2', 'Poszt3']
    });
    this.groupForm.reset();
    // TODO: uzenet a sikeres csoport letrehozasrol
  }


}
