import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration
  ) { }

  setHeaderToken() {
    return this.api.setHeaderToken();
  }
  getUser() {
    return this.api.getData(this.apiConfig.user);
  }

}
