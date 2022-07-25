import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  packageList: any = {
    lastLoadedAt: null,
    lastResponse: {},
  };
  readonly PACKAGE_LIST_REFRESH_MINUTES = 15;

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration
  ) { }

  async getPackages() {
    try {
      if (
        !this.packageList.lastLoadedAt ||
        moment(new Date()).isAfter(this.packageList.lastLoadedAt)
      ) {
        const response = await this.api.getData(this.apiConfig.packages);
        if (response.status === 'SUCCESS') {
          this.packageList.lastResponse = response;
          this.packageList.lastLoadedAt = moment(new Date()).add(
            this.PACKAGE_LIST_REFRESH_MINUTES,
            'minutes'
          );
        }
        return response;
      } else return this.packageList.lastResponse;
    } catch (e) {
      throw e;
    }
  }

  getPackageDetails(packageId: string) {
    return this.api.getData(`${this.apiConfig.packages}/${packageId}`);
  }

  separatePackagesAndCoins(packages: any[]): { packages: any[], coins: any[] } {
    const packageList = [];
    const coinList = [];
    packages.forEach(p => {
      if (p.coins.length > 1)
        packageList.push(p);
      else
        coinList.push(p);
    });
    return {
      packages: packageList,
      coins: coinList
    };
  }
}
