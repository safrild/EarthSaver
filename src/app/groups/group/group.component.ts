import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Group} from '../group.model';
import {GroupsService} from '../groups.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  posts: any[] = [];
  subs: Subscription;
  thisgroup: Group;
  postForm: FormGroup;
  private readonly notifier: NotifierService;

  constructor(private firebaseService: FirebaseService, private groupsService: GroupsService, private authService: AuthService,
              notifierService: NotifierService) {
    this.thisgroup = this.groupsService.groupToOpen;
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.postForm = new FormGroup({
      post: new FormControl('', {
        validators: [Validators.required]
      })
    });
    this.getPosts();
  }

  onSubmit() {
    this.firebaseService.updatePosts(this.thisgroup, this.postForm.value.post);
    this.notifier.notify('success', 'Group post shared succeffully');
    this.postForm.reset();
  }

  getPosts() {
    this.subs = this.firebaseService.getGroups().subscribe(data => {
      this.posts = [];
      for (const g of data) {
        if (this.thisgroup.id === g.id) {
          for (const p of g.posts) {
            this.posts.push(p);
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
