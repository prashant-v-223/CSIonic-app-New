import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-maintenance-mode',
  templateUrl: './maintenance-mode.page.html',
  styleUrls: ['./maintenance-mode.page.scss'],
})
export class MaintenanceModePage implements OnInit {
  backButtonSubscription;
  constructor(private platform: Platform) { }
  ngOnInit() {
  }
  exitApp() {
    this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }
}
