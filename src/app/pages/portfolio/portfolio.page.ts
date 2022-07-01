import { Component, OnInit } from '@angular/core';
import { SIPService } from 'src/app/shared/services/sip.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {

  showLoader = true;
  sipList: any[] = []
  portfolioInfo:any;
  constructor(
    private sipService: SIPService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loadSIPList();
    localStorage.setItem('withdraw','true');
    this.getPortfolioDetails();

  }

  async loadSIPList() {
    this.showLoader = true;
    try {
      const SIPresponse = await this.sipService.getSIPs();
      if (SIPresponse.status === 'SUCCESS' && SIPresponse?.data?.data) {
        this.sipList = SIPresponse?.data?.data;
        this.showLoader = false;
      }
    } catch (e) {
      console.error('Error while loading SIP list', e);
    }
  }

  async getPortfolioDetails() {
    this.showLoader = true;
    try {
      const posrtfolioData = await this.userService.getPortfolioDataDetails();
      this.portfolioInfo = posrtfolioData.data;
      this.showLoader = false;
    } catch (e) {
      console.log('Error while getting portfolio details: ', e);
    }
  }

}
