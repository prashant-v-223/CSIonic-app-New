import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { PackagesService } from 'src/app/shared/services/packages.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private navCtrl:NavController,
    private configurationService: ConfigurationService,
    private router:Router
  ) {
    this.user = this.userService.getUserFromStorage();

  }

  ngOnInit(): void {
    this.getPackages();
    this.getUserInfo();
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


  async getUserInfo() {

    try
    {
      await this.userService.setHeaderToken();
      const user = this.userService.getUserFromStorage();
      const config = await this.configurationService.getConfiguration();

      if (user && config)
      {
        console.log(user.earlyAccess);
        if(user.earlyAccess==true)
        {
          console.log(user.earlyAccess,"2313");
          if(user.isReferalUsed==false && config.referral==true)
          {
            this.router.navigateByUrl('/referral');
          }
          else
          {
            this.router.navigateByUrl('/tabs/dashboard');
          }
        }
        else
        {
          this.router.navigateByUrl('/early-access');
        }
      }
      else
      {
        this.router.navigateByUrl('/');
      }
    }
    catch (e)
    {
      this.router.navigateByUrl('/');
    }
  }
}
