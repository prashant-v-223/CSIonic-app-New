import { Component, OnInit } from '@angular/core';
import { SIPService } from 'src/app/shared/services/sip.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {
  
  showLoader = true;
  sipList: any[] = []

  constructor(
    private sipService: SIPService
  ) { }

  ngOnInit() {
    this.loadSIPList();
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

}
