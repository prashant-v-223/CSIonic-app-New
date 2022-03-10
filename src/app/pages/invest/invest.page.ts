import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.page.html',
  styleUrls: ['./invest.page.scss'],
})
export class InvestPage implements OnInit {
  selectedTab: string = 'investList'; 
  portfolioList: any[] = []

  user: any;

  constructor(
    private userService: UserService
  ) {
    this.user = this.userService.getUserFromStorage();
  }

  ngOnInit() {
  }

  public segment: string = "Coins";  

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

}
