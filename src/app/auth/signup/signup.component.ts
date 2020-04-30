import {Component, OnChanges, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  correctEmail: boolean = true;
  private readonly notifier: NotifierService;

  constructor(private authService: AuthService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });

    this.isCorrect();
    if (!this.correctEmail) {
      form.reset();
    }

    this.notifier.notify('Success', 'Succesful registration', 'registerNoti');
  }

  isCorrect() {
    this.correctEmail = this.authService.correctMail === '';
  }
}
