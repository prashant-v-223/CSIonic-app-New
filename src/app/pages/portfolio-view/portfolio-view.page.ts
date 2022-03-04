import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.page.html',
  styleUrls: ['./portfolio-view.page.scss'],
})
export class PortfolioViewPage implements OnInit {
  public segment: string = "day"; 
  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
