import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
})
export class OnboardPage implements OnInit {

  constructor() { }

  ngOnInit() { }

  browsePolicy() {
    Browser.open({ url: 'https://prosppr.com/privacy.html' });
  }
}
