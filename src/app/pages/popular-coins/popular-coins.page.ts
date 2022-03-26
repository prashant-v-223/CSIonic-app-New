import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/shared/services/packages.service';

@Component({
  selector: 'app-popular-coins',
  templateUrl: './popular-coins.page.html',
  styleUrls: ['./popular-coins.page.scss'],
})
export class PopularCoinsPage implements OnInit {

  showLoader = true;
  coinList: any[] = [];

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
        this.coinList = this.packagesService.separatePackagesAndCoins(planListRes?.data?.data).coins;
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting packages list: ', e);
    }
  }
}
