import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

import { Auth } from 'aws-amplify';
import { NavController } from '@ionic/angular';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly USER_STORAGE_KEY = 'user';

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration,
    private navCtrl: NavController,
    private configurationService: ConfigurationService,
  ) {
    this.setHeaderToken();  
  }

  setUserToStorage(user: any) {
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
  }

  getUserFromStorage() {
    return JSON.parse(localStorage.getItem(this.USER_STORAGE_KEY));
  }

  setHeaderToken() {
    return this.api.setHeaderToken();
  }
  
  getUser() {
    return this.api.getData(this.apiConfig.user);
  }

  verifySelfie(formData: FormData) {
    return this.api.postData(this.apiConfig.verifySelfie, formData);
  }

  verifyProof(formData: FormData) {
    return this.api.postData(this.apiConfig.verifyProof, formData);
  }

  signOut() {
    localStorage.clear();
    this.configurationService.clearConfiguration();
    setTimeout(async () => {
      await Auth.signOut({
        global: true
      });
      this.navCtrl.navigateRoot('/sign-in');
    }, 500);
  }
}
