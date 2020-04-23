import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.addUser().then(data => {
      console.log(data);
    });
  }
}
