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

  async depositAmount(depositAmount:string) {
    const depositAmountData = {depositAmount:depositAmount};
      const depositData = await this.api.postData(this.apiConfig.depositAmount,depositAmountData);
      if (depositData?.status === 'SUCCESS')
      {
        return depositData;
      }
      else
      {
        throw new Error('Error in fetching configuration');
      }

  }

  async transactionList() {

      const transactionListData = await this.api.getData(this.apiConfig.transactionList);
      if (transactionListData?.data!="")
      {
        return transactionListData;
      }
      else
      {
        throw new Error('Error in fetching configuration');
      }

  }
}
