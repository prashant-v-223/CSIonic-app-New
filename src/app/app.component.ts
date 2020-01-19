import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  currentStatusBarColor: string = '';
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        
        this.platform.ready().then(() => {
          if(['/tabs/dashboard', '/tabs/savings', '/tabs/investment', '/tabs/goals', '/'].indexOf(event.url) !== -1){
            const color = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary');
            if (this.currentStatusBarColor !== color){
              this.statusBar.backgroundColorByHexString(color.trim());
              this.statusBar.styleLightContent();
              this.currentStatusBarColor = color;
            }
          } else if(this.currentStatusBarColor !== '#ffffff') {
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString('#ffffff');
            this.currentStatusBarColor = '#ffffff';
          }
        });
      }
    })
  }
}
