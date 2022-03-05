import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.page.html',
  styleUrls: ['./invest.page.scss'],
})
export class InvestPage implements OnInit {
  selectedTab: string = 'investList'; 
  portfolioList: any[] = [
  ]
  constructor() { }

  ngOnInit() {
  }
  public segment: string = "Coins";  

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

}
