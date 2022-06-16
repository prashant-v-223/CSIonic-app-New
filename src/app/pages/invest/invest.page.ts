import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/shared/services/packages.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.page.html',
  styleUrls: ['./invest.page.scss'],
})
export class InvestPage implements OnInit {
  selectedTab: string = 'investList';
  portfolioList: any[] = []

  user: any;

  showLoader = true;
  packageList: any[] = [];
  coinList: any[] = [];

  constructor(
    private userService: UserService,
    private packagesService: PackagesService,
  ) {
    this.user = this.userService.getUserFromStorage();
  }

  ngOnInit() {
    this.getPackages();
  }

  public segment: string = "Coins";

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  async getPackages() {
    try {
      const planListRes = await this.packagesService.getPackages();
      if (planListRes?.data?.data) {
        const separated = this.packagesService.separatePackagesAndCoins(planListRes?.data?.data);
        this.packageList = separated.packages;
        this.coinList = separated.coins;
       // console.log(this.coinList,'1',this.packageList);
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting packages list: ', e);
    }
  }
}
