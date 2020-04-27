import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FeedService} from '../feed.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-postwriter',
  templateUrl: './postwriter.component.html',
  styleUrls: ['./postwriter.component.css']
})
export class PostwriterComponent implements OnInit {
  postForm: FormGroup;

  constructor(private feedService: FeedService, private authService: AuthService) {
  }

  ngOnInit() {
    this.postForm = new FormGroup({
      post: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    this.feedService.createPost({
      username: this.authService.getUser().email,
      text: this.postForm.value.post
    });
  }

}
