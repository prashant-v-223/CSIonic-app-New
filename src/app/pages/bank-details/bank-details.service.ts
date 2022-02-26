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

  getAccountDetails(userId: string) {
    return this.api.getData(this.apiConfig.bankAccount + "/" + userId);
  }

  addAccountDetails(data: any) {
    return this.api.postData(this.apiConfig.bankAccount, data);
  }

  updateAccountDetails(accountId: string, data: any) {
    return this.api.putData(this.apiConfig.bankAccount + "/" + accountId, data);
  }

}
