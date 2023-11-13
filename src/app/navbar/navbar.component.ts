import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  public toggleFileMenuFlag = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleFileMenu() {
    this.toggleFileMenuFlag = this.toggleFileMenuFlag + 1;
  }

}
