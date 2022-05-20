import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration
  ) {}

  async DepositAmount(deposit_amount:string) {
      const deposit_data = await this.api.getData(this.apiConfig.configuration);
      if (deposit_data?.status === 'SUCCESS')
      {
        return deposit_data;
      }
      else
      {
        throw new Error('Error in fetching configuration');
      }

  }
}
