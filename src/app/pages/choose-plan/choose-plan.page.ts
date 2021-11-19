import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.page.html',
  styleUrls: ['./choose-plan.page.scss'],
})
export class ChoosePlanPage implements OnInit {

  planList: any[] = [
    {
      name: "Bitcoin",
      minInvest: 100,
      returns: 80,
      low: 20,
      high: 60,
    },
    {
      name: "Ethereun",
      minInvest: 50,
      returns: 60,
      low: 35,
      high: 76,
    },
    {
      name: "bitcoin + Ethereum + BNB",
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
      name: "Doge and Shib (High Risk)",
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
      name: "Exchange basket (BNB / FTX / Kucoin) / Choose till this",
      minInvest: 70,
      returns: -45,
      low: 27,
      high: 67,
    },
  ];

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onSelectPlan() {
    this.navCtrl.navigateForward('/choose-plan-frequency');
  }

}
