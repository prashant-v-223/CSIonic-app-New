import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { SplashScreen } from '@capacitor/splash-screen';
import { UserService } from './shared/services/user.service';
import { ConnectionStatus, Network } from '@capacitor/network';
import { Router } from '@angular/router';
import { ErrorEnum } from './shared/types/error';
import { ConfigurationService } from './shared/services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  
  constructor(
    library: FaIconLibrary,
    private userService: UserService,
    private configurationService: ConfigurationService,
    private router: Router
  ) {
    library.addIconPacks(fas as any, fab as any, far as any);
  }
  
  async ngOnInit() {
    try {
      const status = await Network.getStatus();
      this.handleNetworkStatus(status);
      Network.addListener("networkStatusChange", status => this.handleNetworkStatus(status));
  
      await SplashScreen.show({
        autoHide: false
      });
  
      const userToken = this.userService.setHeaderToken();
      
      if (userToken){
        const config = await this.configurationService.getConfiguration();
        if (config)
          await SplashScreen.hide();
        else
          throw new Error("Configuration not available");
      } else {
        throw new Error("UserToken not available");
      }
    } catch (e) {
      console.log(e);
      this.userService.signOut();
    }
  }

  async handleNetworkStatus(status: ConnectionStatus) {
    if (!status.connected){
      this.router.navigateByUrl(`/error/${ErrorEnum.NO_INTERNET}?redirect=${this.router.url}`, { replaceUrl: true });
      await SplashScreen.hide();
    }
  }

  ngOnDestroy(): void {
    Network.removeAllListeners();
  }
}

