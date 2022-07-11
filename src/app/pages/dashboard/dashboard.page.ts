import { Component, OnInit, Output, ViewEncapsulation  } from '@angular/core';
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
  /* packageList: any[] = [];
  coinList: any[] = []; */
  portfolioInfo:any='';
  @Output() coinList: any;
  @Output() packageList: any;
  user: any;
  userData: any;

  constructor(
    private packagesService: PackagesService,
    private userService: UserService,
    private navCtrl:NavController,
    private configurationService: ConfigurationService,
    private router:Router
  ) {
    this.user = this.userService.getUserFromStorage();

  }

  async ngOnInit() {
    await this.getPackages();
    await this.getUserInfo();
    await this.getPortfolioDetails();
  }

  async ionViewWillEnter()
  {
    await this.getPackages();
    await this.getUserInfo();
    await this.getPortfolioDetails();
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

  async getPortfolioDetails() {
    this.showLoader = true;
    try {
      const posrtfolioData = await this.userService.getPortfolioDataDetails();
      if (posrtfolioData?.data) {
        this.portfolioInfo = posrtfolioData.data;
        //console.log(this.portfolioInfo);
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting portfolio details: ', e);
    }
  }


  async getUserInfo() {

    try
    {
      await this.userService.setHeaderToken();

      this.userData = await this.userService.getUser();
      //console.log(this.userData);
      this.userService.setUserToStorage(this.userData.data);
      const user = await this.userService.getUserFromStorage();
      const config = await this.configurationService.getConfiguration();

      if (user && config)
      {

        if(user.earlyAccess==true)
        {
          //console.log(user.earlyAccess,"2313");
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
function output() {
  throw new Error('Function not implemented.');
}

