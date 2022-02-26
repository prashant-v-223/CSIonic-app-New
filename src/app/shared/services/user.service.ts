import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly USER_STORAGE_KEY = 'user';

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration
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

}
