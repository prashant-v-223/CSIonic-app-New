import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration
  ) {}

  //Deposit/Withdrawal Amount API
  async depositWithdrawalAmount(amount:string,type:string,utrNumber?:string) {
      try
      {
        const amountData = {depositAmount:amount,utrNumber:utrNumber};
        const responseData = await this.api.postData(this.apiConfig.depositWithdrawalAmount+type,amountData);
        return responseData;
      }
      catch(e)
      {
        throw e;
      }

  }

  //Transaction List API
  async transactionList() {
      try
      {
        const transactionListData = await this.api.getData(this.apiConfig.transactionList);
        return transactionListData;
      }
      catch(e)
      {
        throw e;
      }
  }
}
