import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../firebase.service';
import {Profile} from './profile.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  subs: Subscription;
  profiles: Profile[];

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.profileForm = new FormGroup({
      bio: new FormControl('', {
        validators: [Validators.required]
      }),
      age: new FormControl('', {
        validators: [Validators.required]
      })
    });
    this.getProfiles();
  }

  addProfile(p: Profile) {
    const profile: Profile = {
      id: Math.random().toString(36).substr(2, 9),
      photo: 'asd.url.com.xd',
      bio: p.bio,
      age: p.age,
      posts: [],
      groups: []
    };
    this.firebaseService.addProfile(profile);
  }

  onSubmit() {
    this.addProfile({
      id: Math.random().toString(36).substr(2, 9),
      photo: '',
      bio: this.profileForm.value.bio,
      age: this.profileForm.value.age,
      posts: [],
      groups: []
    });
    this.profileForm.reset();
    // this.notifier.notify('Success', 'Group added successfully', 'addGroupNoti');

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
