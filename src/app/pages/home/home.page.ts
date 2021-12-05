import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  SIPList: any[] = [
    {
      name: "Bitcoin",
      investment: 2000,
      returns: 2045,
    },
    {
      name: "Ethereum",
      investment: 34000,
      returns: 35190,
    },
    {
      name: "Bitcoin + Ethereum + BNB",
      investment: 7629,
      returns: 6800,
    },
    {
      name: "Bitcoin + Ethereum + BNB + ADA + XRP",
      investment: 7629,
      returns: 7800,
    },
    {
      name: "Doge and Shiba Inu (High Risk)",
      investment: 7629,
      returns: 7800,
    },
    {
      name: "Polkadot + Solana + Polygon (Matic)",
      investment: 7629,
      returns: 7800,
    },
    {
      name: "Exchange basket (BNB / FTX / Kucoin)",
      investment: 7629,
      returns: 7800,
    },
  ];

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onViewDetails() {
    this.navCtrl.navigateForward('/dashboard/sip-details');
  }

  viewTransactions() {
    this.navCtrl.navigateForward('/dashboard/transaction-list');
  }

}
