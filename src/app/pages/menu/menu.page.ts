import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuItems: any[];
  selectedPath: string = '';

  constructor(
    private router: Router
  ) {
    this.menuItems = [
      {
        label: 'Login',
        icon: 'unlock',
        url: '/login'
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) this.selectedPath = event.url;
    });
  }

}
