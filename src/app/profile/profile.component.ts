import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../firebase.service';
import {Profile} from './profile.model';
import {Subscription} from 'rxjs/Subscription';
import {GroupsService} from '../groups/groups.service';
import {FeedService} from '../feed/feed.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  subs: Subscription;
  profiles: Profile[];

  // TODO: MINDEN

  constructor(private firebaseService: FirebaseService, private groupsService: GroupsService, private feedService: FeedService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.profileForm = new FormGroup({
      bio: new FormControl('', {
        validators: [Validators.required]
      }),
      age: new FormControl('', {
        validators: [Validators.required]
      }),
      hobbies: new FormControl('', {
        validators: [Validators.required]
      })
    });
    this.getProfiles();
  }

  // TODO:  posztok hozzarakasa = KURVA szar
  addProfile(p: Profile) {
    const profile: Profile = {
      id: this.authService.getUser().email,
      bio: p.bio,
      age: p.age,
      hobbies: p.hobbies,
      posts: [],
      groups: this.groupsService.myGroups
    };
    this.firebaseService.addProfile(profile);
  }

  onSubmit() {
    this.addProfile({
      id: '',
      bio: this.profileForm.value.bio,
      age: this.profileForm.value.age,
      hobbies: this.profileForm.value.hobbies,
      posts: [],
      groups: []
    });
    this.profileForm.reset();
  }

  getProfiles() {
    this.subs = this.firebaseService.getProfiles().subscribe(data => {
      this.profiles = [];
      for (const p of data) {
        this.profiles.push(p);
      }
    });
  }


}
