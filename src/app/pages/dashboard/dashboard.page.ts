import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  SIPList: any[] = [
    {
      name: "ICICI Prudential Focused Bluechip Equity Fund.",
      investment: 2000,
      returns: 2045,
    },
    {
      name: "Axis Prudential Focused Bluechip Equity Fund.",
      investment: 34000,
      returns: 35190,
    },
    {
      name: "HDFC Prudential Focused Bluechip Equity Fund.",
      investment: 7629,
      returns: 6800,
    },
    {
      name: "HDFC Prudential Focused Bluechip Equity Fund.",
      investment: 7629,
      returns: 7800,
    },
    {
      name: "HDFC Prudential Focused Bluechip Equity Fund.",
      investment: 7629,
      returns: 7800,
    },
    {
      name: "HDFC Prudential Focused Bluechip Equity Fund.",
      investment: 7629,
      returns: 7800,
    },
    {
      name: "HDFC Prudential Focused Bluechip Equity Fund.",
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

}
