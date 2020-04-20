import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {  }

  logout() {  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {  }

}
