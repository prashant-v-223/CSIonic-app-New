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
  coins: any[] = [];

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
        this.coins = this.packagesService.separatePackagesAndCoins(planListRes?.data?.data).coins;
        this.coinList = this.coins;
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting packages list: ', e);
    }
  }

  onSearchChange(evt: any) {
    if (evt.value.length !== 0) {
      this.coinList = this.coins.filter((value) => value.name.includes(evt.value));
    } else {
      this.coinList = this.coins;
    }
  }

  onClear() {
    this.coinList = this.coins;
  }
}
