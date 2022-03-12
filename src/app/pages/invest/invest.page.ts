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
        this.packageList = planListRes?.data?.data;
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting packages list: ', e);
    }
  }
}
