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
import { COPY } from 'src/app/shared/helper/const';

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
  
      const userRes = this.userService.setHeaderToken();
      if (userRes){
        await this.getUser();
      }
      await SplashScreen.hide();
    } catch (e) {
      console.log(e);
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

