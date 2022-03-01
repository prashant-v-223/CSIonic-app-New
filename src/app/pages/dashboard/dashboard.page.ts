import { AfterViewInit, Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PackagesService } from 'src/app/shared/services/packages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage implements OnInit {

  showLoader = true;
  selectedTab: string = 'planList';
  // planList: any[] = [];
  planList: any[] = [
    // {
    //   name: "Bitcoin",
    //   minInvest: 100,
    //   returns: 80,
    //   low: 20,
    //   high: 60,
    // },
    // {
    //   name: "Ethereum",
    //   minInvest: 50,
    //   returns: 60,
    //   low: 35,
    //   high: 76,
    // },
    // {
    //   name: "Bitcoin + Ethereum + BNB",
    //   minInvest: 70,
    //   returns: 45,
    //   low: 27,
    //   high: 67,
    // },
    // {
    //   name: "Bitcoin + Ethereum + BNB + ADA + XRP",
    //   minInvest: 70,
    //   returns: 45,
    //   low: 27,
    //   high: 67,
    // },
    // {
    //   name: "Doge and Shiba Inu (High Risk)",
    //   minInvest: 70,
    //   returns: 45,
    //   low: 27,
    //   high: 67,
    // },
    // {
    //   name: "Polkadot + Solana + Polygon (Matic)",
    //   minInvest: 70,
    //   returns: 45,
    //   low: 27,
    //   high: 67,
    // },
    // {
    //   name: "Exchange basket (BNB/FTX/Kucoin)",
    //   minInvest: 70,
    //   returns: -45,
    //   low: 27,
    //   high: 67,
    // },
  ]

  constructor(
    private packagesService: PackagesService
  ) { }
  
  ionViewWillEnter(): void {
    this.showLoader = true;
    this.getPackages();
  }

  ngOnInit() {}
  
  async getPackages() {
    try {
      const planListRes = await this.packagesService.getPackages();
      if (planListRes?.data?.data) {
        this.planList = planListRes?.data?.data;
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting packages list: ', e);
    }
  }

  onSelectTab(type) {
    this.selectedTab = type;
  }

}
