import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Group} from './group.model';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {GroupsService} from './groups.service';
import {Router} from '@angular/router';
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
  mygroups: Group[] = [];
  groupToOpen: Group;

  constructor(private authService: AuthService, private groupService: GroupsService, notifierService: NotifierService,
              public router: Router, private firebaseService: FirebaseService) {
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
    this.getMyGroups();
  }

  getGroups() {
    this.subs = this.firebaseService.getGroups().subscribe(data => {
      this.groups = [];
      for (const group of data) {
        this.groups.push(group);
      }
    });
  }

  // TODO: ez jelenleg ugy szar, ahogy van
  async getMyGroups() {
    await this.getGroups();
    for (const g of this.groups) {
      console.log(this.authService.getUser().email);
      if (g.users.indexOf(this.authService.getUser().email) >= 1) {
        this.mygroups.push(g);
      }
    }
  }

  // TODO: csoportonkenti posztok kulon kiirasa



  onSubmit() {
    this.groupService.addGroup({
      id: Math.random().toString(36).substr(2, 9),
      name: this.groupForm.value.name,
      description: this.groupForm.value.description,
      users: [],
      posts: []
    });
    this.groupForm.reset();
    this.notifier.notify('Success', 'Group added successfully', 'addGroupNoti');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  newGroup() {
    this.newgroup = true;
  }

  navigate(gto: Group) {
    this.groupToOpen = gto;
    this.router.navigate(['/group']);
  }
}
