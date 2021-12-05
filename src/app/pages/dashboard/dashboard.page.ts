import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  selectedTab: string = 'planList';
  planList: any[] = [
    {
      name: "Bitcoin",
      minInvest: 100,
      returns: 80,
      low: 20,
      high: 60,
    },
    {
      name: "Ethereum",
      minInvest: 50,
      returns: 60,
      low: 35,
      high: 76,
    },
    {
      name: "Bitcoin + Ethereum + BNB",
      minInvest: 70,
      returns: 45,
      low: 27,
      high: 67,
    },
    {
      name: "Bitcoin + Ethereum + BNB + ADA + XRP",
      minInvest: 70,
      returns: 45,
      low: 27,
      high: 67,
    },
    {
      name: "Doge and Shiba Inu (High Risk)",
      minInvest: 70,
      returns: 45,
      low: 27,
      high: 67,
    },
    {
      name: "Polkadot + Solana + Polygon (Matic)",
      minInvest: 70,
      returns: 45,
      low: 27,
      high: 67,
    },
    {
      name: "Exchange basket (BNB / FTX / Kucoin)",
      minInvest: 70,
      returns: -45,
      low: 27,
      high: 67,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectTab(type) {
    this.selectedTab = type;
  }

}
