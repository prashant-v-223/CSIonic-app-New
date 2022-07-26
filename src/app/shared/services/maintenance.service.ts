import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

import { NavController } from '@ionic/angular';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private api: ApiCallService,
    private apiConfig: ApiConfiguration
  ) { }

  checkMaintenance() {
    return this.api.getData(this.apiConfig.checkMaintenance + 'maintenance');
  }

  getLatestVersion() {
    return this.api.getData(this.apiConfig.checkMaintenance + 'latest');
  }
}
