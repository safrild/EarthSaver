import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Group} from '../group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
  }


  ngOnDestroy(): void {

  }

}
