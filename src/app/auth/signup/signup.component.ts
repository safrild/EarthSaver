import {Component, OnChanges, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  correctEmail: boolean = true;


  constructor(private authService: AuthService) { }

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
  }

  isCorrect() {
    this.correctEmail = this.authService.correctMail === '';
  }
}
