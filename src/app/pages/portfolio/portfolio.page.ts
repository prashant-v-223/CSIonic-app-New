import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  testing:string='';
  constructor(
    private sipService: SIPService,
    private router: Router,
    private userService: UserService,
  ) {
   }

   async ngOnInit() {
  }

  async ionViewWillEnter()
  {
    await this.loadSIPList();
    localStorage.setItem('withdraw','true');
    await this.getPortfolioDetails();
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
    if(localStorage.getItem('portfolio-data')!=null)
    {
      this.portfolioInfo = localStorage.getItem('portfolio-data');
    }
    this.showLoader = localStorage.getItem('portfolio-data')=='' ? true : false;

    try {
        this.userService.getPortfolioDataDetails$().subscribe(res => {
          this.portfolioInfo = res.data;
          localStorage.setItem('portfolio-data',JSON.stringify(this.portfolioInfo));
          this.showLoader==true ? this.showLoader=false : "";
        })
    } catch (e) {
      console.log('Error while getting portfolio details: ', e);
    }
  }

}
