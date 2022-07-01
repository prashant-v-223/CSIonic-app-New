import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { SplashScreen } from '@capacitor/splash-screen';
import { ConnectionStatus, Network } from '@capacitor/network';
import { Router } from '@angular/router';

import { UserService } from './shared/services/user.service';
import { ErrorEnum } from './shared/types/error';
import { ConfigurationService } from './shared/services/configuration.service';
import { COPY } from 'src/app/shared/helper/const';
import { MaintenanceService } from './shared/services/maintenance.service';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  CONSTANT: any = COPY;
  versionNumber: string;
  constructor(
    library: FaIconLibrary,
    private userService: UserService,
    private configurationService: ConfigurationService,
    private router: Router,
    private maintenanceService: MaintenanceService,
    private appVersion: AppVersion,
    private platform: Platform
  ) {
    library.addIconPacks(fas as any, fab as any, far as any);


  }


  async ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      this.appVersion.getVersionNumber()
        .then((res) => {
          this.versionNumber = res;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    try {
      let maintenanceCheck = await this.maintenanceService.getLatestVersion();
      if (maintenanceCheck.data.maintenance) {
        this.router.navigateByUrl('maintenance-mode');
      }
      else {
        this.versionNumber = this.versionNumber != '' ? this.versionNumber.split('.').join("") : "0";
        if (maintenanceCheck.data.mandatoryUpdate && maintenanceCheck.data.latest.split('.').join("") > this.versionNumber && Capacitor.isNativePlatform()) {
          this.router.navigateByUrl('force-app-update');
        } else {
          const status = await Network.getStatus();
          this.handleNetworkStatus(status);
          Network.addListener("networkStatusChange", status => this.handleNetworkStatus(status));

          await SplashScreen.show({
            autoHide: false
          });

          // this.router.navigateByUrl('maintenance-mode');
          const userToken = this.userService.setHeaderToken();
          if (userToken) {
            const user = await this.getUser();
            if (!user)
              throw new Error("User not available");

            const config = await this.configurationService.getConfiguration();
            if (!config)
              throw new Error("Configuration not available");
          } else {
            throw new Error("UserToken not available");
          }
        }
      }
    } catch (e) {
      this.userService.signOut();
    } finally {
      await SplashScreen.hide();
    }
  }

  async handleNetworkStatus(status: ConnectionStatus) {
    if (!status.connected) {
      this.router.navigateByUrl(`/error/${ErrorEnum.NO_INTERNET}?redirect=${this.router.url}`, { replaceUrl: true });
      await SplashScreen.hide();
    }
  }

  async getUser() {
    try {
      const userRes = await this.userService.getUser();
      if (userRes.status === this.CONSTANT.SUCCESS) {
        this.userService.setUserToStorage(userRes.data);
        return userRes.data;
      }
    } catch (e) {
      console.log('Error in fetching user data', e);
      return null;
    }
  }

  ngOnDestroy(): void {
    Network.removeAllListeners();
  }
}

