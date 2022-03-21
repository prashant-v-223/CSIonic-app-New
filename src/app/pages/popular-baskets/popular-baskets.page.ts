import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/shared/services/packages.service';

@Component({
  selector: 'app-popular-baskets',
  templateUrl: './popular-baskets.page.html',
  styleUrls: ['./popular-baskets.page.scss'],
})
export class PopularBasketsPage implements OnInit {

  showLoader = true;
  packageList: any[] = [];

  constructor(
    private packagesService: PackagesService,
  ) { }

  ngOnInit() {
    this.getPackages();
  }

  async getPackages() {
    try {
      const planListRes = await this.packagesService.getPackages();
      if (planListRes?.data?.data) {
        this.packageList = this.packagesService.separatePackagesAndCoins(planListRes?.data?.data).packages;
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting packages list: ', e);
    }
  }
}
