import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }


  onToggleSidenav() {
    this.sidenavToggle.emit();
  }


}
