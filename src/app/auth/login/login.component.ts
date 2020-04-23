import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  correctEmail: boolean = true;
  correctPsw: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    this.isCorrect();
    if (!this.correctEmail || !this.correctPsw) {
      this.loginForm.reset();
    }
  }

  isCorrect() {
    this.correctEmail = this.authService.correctMail === '';
    console.log(this.correctEmail);
    this.correctPsw = this.authService.correctPsw === '';
    console.log(this.correctPsw);
  }
}
