import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.page.html',
  styleUrls: ['./portfolio-details.page.scss'],
})
export class PortfolioDetailsPage implements OnInit {
  selectedTab: string = 'portfolioList';
  portfolioList: any[] = [
  ]
  constructor() { }

  ngOnInit() {
  }

}
