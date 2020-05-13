import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Group} from '../group.model';
import {GroupsService} from '../groups.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  posts: any[] = [];
  subs: Subscription;
  thisgroup: Group;


  constructor(private firebaseService: FirebaseService, private groupsService: GroupsService, private authService: AuthService) {
    this.thisgroup = this.groupsService.groupToOpen;
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.subs = this.firebaseService.getGroups().subscribe(data => {
      for (const g of data) {
        if (this.thisgroup.id === g.id) {
          for (const p of g.posts) {
            this.posts.push(p);
          }
        }
      }
    });
    console.log(this.posts);
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
