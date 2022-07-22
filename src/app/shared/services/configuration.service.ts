import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private configuration;

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration
  ) { }

  async getConfiguration(fetchFromServer = false) {
    if (fetchFromServer || !this.configuration) {
      const configResult = await this.api.getData(this.apiConfig.configuration);
      if (configResult?.status === 'SUCCESS') {
        this.configuration = configResult.data;
      } else {
        throw new Error('Error in fetching configuration');
      }
    }
    return this.configuration;
  }

  clearConfiguration() {
    this.configuration = null;
  }
}
