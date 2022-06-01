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
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  CONSTANT: any = COPY;

  constructor(
    library: FaIconLibrary,
    private userService: UserService,
    private configurationService: ConfigurationService,
    private router: Router,
    private maintenanceService: MaintenanceService,
    ) {
    library.addIconPacks(fas as any, fab as any, far as any);
  }

  async ngOnInit() {
    try
    {
      const status = await Network.getStatus();
      this.handleNetworkStatus(status);
      Network.addListener("networkStatusChange", status => this.handleNetworkStatus(status));

      await SplashScreen.show({
        autoHide: false
      });

      const { version } = require('package.json');
      try
      {
        let maintenanceCheck = await this.maintenanceService.checkMaintenance();
        if(maintenanceCheck.data.maintenance===true)
        {
          this.router.navigateByUrl('maintenance-mode');
        }
        else
        {
          const getLatestVersion = await this.maintenanceService.getLatestVersion();
          if(getLatestVersion.data.mandatoryUpdate===true && getLatestVersion.data.latest>version)
          {
            this.router.navigateByUrl('force-app-update');
          }
        }
      }
      catch(error)
      {
        if(error.status===503)
        {
          this.router.navigateByUrl('maintenance-mode');
        }
        else
        {
          throw new Error("Not found!");
        }
      }




      const userToken = this.userService.setHeaderToken();
      if (userToken)
      {

        const user = await this.getUser();
        if (!user)
          throw new Error("User not available");

        const config = await this.configurationService.getConfiguration();
        if (!config)
          throw new Error("Configuration not available");
      } else {
        throw new Error("UserToken not available");
      }
    } catch (e) {
      console.log(e);
      this.userService.signOut();
    } finally {
      await SplashScreen.hide();
    }
  }

  async handleNetworkStatus(status: ConnectionStatus) {
    if (!status.connected){
      this.router.navigateByUrl(`/error/${ErrorEnum.NO_INTERNET}?redirect=${this.router.url}`, { replaceUrl: true });
      await SplashScreen.hide();
    }
  }

  async getUser() {
    try {
      const userRes = await this.userService.getUser();
      if (userRes.status === this.CONSTANT.SUCCESS)
      {
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

