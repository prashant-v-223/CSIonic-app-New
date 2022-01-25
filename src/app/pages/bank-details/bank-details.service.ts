import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

@Injectable({
  providedIn: 'root'
})
export class BankDetailsService {

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration
  ) { }

  getAccountDetails(id) {
    return this.api.getData(this.apiConfig.bankAccount + "/" + id);
  }

  addEditAccountDetails(data: any, userId: string) {
    if (userId) {
      return this.api.putData(this.apiConfig.bankAccount + "/" + userId, data);
    } else {
      return this.api.postData(this.apiConfig.bankAccount, data);
    }
  }

}
