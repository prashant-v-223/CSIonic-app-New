import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { PackagesService } from 'src/app/shared/services/packages.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage implements OnInit {

  showLoader = true;
  packageList: any[] = [];
  coinList: any[] = [];
  user: any;

  constructor(
    private packagesService: PackagesService,
    private userService: UserService
  ) {
    this.user = this.userService.getUserFromStorage();
  }

  ngOnInit(): void {
    this.getPackages();
  }
  
  async getPackages() {
    this.showLoader = true;

    try {
      const planListRes = await this.packagesService.getPackages();
      if (planListRes?.data?.data) {
        const separated = this.packagesService.separatePackagesAndCoins(planListRes?.data?.data);
        this.packageList = separated.packages;
        this.coinList = separated.coins;
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting packages list: ', e);
    }
  } 
}
