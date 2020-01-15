import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private platform: Platform,
    private statusBar: StatusBar
  ) {
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary');
      this.statusBar.backgroundColorByHexString(color.trim());
      this.statusBar.styleLightContent();
    });
  }
}
