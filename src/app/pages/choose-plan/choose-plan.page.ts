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
      name: "ICICI Prudential Focused Bluechip Equity Fund.",
      minInvest: 100,
      returns: -10,
      low: 20,
      high: 60,
    },
    {
      name: "Axis Prudential Focused Bluechip Equity Fund.",
      minInvest: 50,
      returns: 10,
      low: 35,
      high: 76,
    },
    {
      name: "HDFC Prudential Focused Bluechip Equity Fund.",
      minInvest: 70,
      returns: 45,
      low: 27,
      high: 67,
    },
    {
      name: "HDFC Prudential Focused Bluechip Equity Fund.",
      minInvest: 70,
      returns: 45,
      low: 27,
      high: 67,
    },
    {
      name: "HDFC Prudential Focused Bluechip Equity Fund.",
      minInvest: 70,
      returns: 45,
      low: 27,
      high: 67,
    },
    {
      name: "HDFC Prudential Focused Bluechip Equity Fund.",
      minInvest: 70,
      returns: 45,
      low: 27,
      high: 67,
    },
    {
      name: "HDFC Prudential Focused Bluechip Equity Fund.",
      minInvest: 70,
      returns: 45,
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
