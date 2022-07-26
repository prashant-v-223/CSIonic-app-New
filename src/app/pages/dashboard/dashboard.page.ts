import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { PackagesService } from 'src/app/shared/services/packages.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage implements OnInit {
  showLoader = true;
  showPortfolioLoader = true;
  currentAmount = 0;
  /* packageList: any[] = [];
  coinList: any[] = []; */
  portfolioInfo:any=localStorage.getItem('portfolio-data');
  @Output() coinList: any;
  @Output() packageList: any;
  user: any;
  userData: any;
  constructor(
    private packagesService: PackagesService,
    private userService: UserService,
    private navCtrl: NavController,
    private configurationService: ConfigurationService,
    private router:Router,
    private socialSharing: SocialSharing
  ) {
    this.user = this.userService.getUserFromStorage();
  }

  async ngOnInit() {
  }

  text: string='Flamenco'
  imgurl:string= 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1600'
  link: string='https://google.com'

  async ionViewWillEnter()
  {
    await this.getPackages();
    await this.getUserInfo();
    await this.getPortfolioDetails();
  }

  ShareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.text, this.imgurl, this.link)
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

    if(localStorage.getItem('portfolio-data')!='null')
    {
      this.portfolioInfo = localStorage.getItem('portfolio-data');
    }
    this.showPortfolioLoader = localStorage.getItem('portfolio-data')=='null' ? true : false;
    try {
      this.userService.getPortfolioDataDetails$().subscribe(res => {
        this.portfolioInfo = res.data;
        this.currentAmount = this.portfolioInfo.currentAmount;
        localStorage.setItem('portfolio-data',JSON.stringify(this.portfolioInfo));
        this.showPortfolioLoader==true ? this.showPortfolioLoader=false : "";
      })
    } catch (e) {
      console.log('Error while getting portfolio details: ', e);
    }
  }

  async getUserInfo() {
    try {
      await this.userService.setHeaderToken();
      this.userData = await this.userService.getUser();
      this.userService.setUserToStorage(this.userData.data);
      const user = await this.userService.getUserFromStorage();
      const config = await this.configurationService.getConfiguration();
      if (user && config) {
        if (user.earlyAccess == true) {
          if (user.isReferalUsed == false && config.referral == true) {
            this.router.navigateByUrl('/referral');
          }
          else {
            this.router.navigateByUrl('/tabs/dashboard');
          }
        }
        else {
          this.router.navigateByUrl('/early-access');
        }
      }
      else {
        this.router.navigateByUrl('/');
      }
    }
    catch (e) {
      this.router.navigateByUrl('/');
    }
  }
  redirectPackages()
  {
    this.router.navigateByUrl('/tabs/invest');
  }
}

function output() {
  throw new Error('Function not implemented.');
}

