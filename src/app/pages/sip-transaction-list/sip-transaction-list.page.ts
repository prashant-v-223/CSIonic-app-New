import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SIPService } from 'src/app/shared/services/sip.service';

@Component({
  selector: 'app-sip-transaction-list',
  templateUrl: './sip-transaction-list.page.html',
  styleUrls: ['./sip-transaction-list.page.scss'],
})
export class SipTransactionListPage implements OnInit {

  id: string;
  transactionList : any;
  public segment: string = "buy";
  transactionType: string = 'buy'
  constructor(
    private sipService: SIPService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];
    console.log(this.id);
    this.loadDetails(this.transactionType);
  }

  async loadDetails(type:string) {
    const res = await this.sipService.getSIPTransectionDetails(this.id,type);
    this.transactionList = res.data?.data;
  }


  segmentChanged(ev: any) {
    this.transactionType = ev.detail.value;
    this.segment = ev.detail.value;
    this.loadDetails(this.transactionType);
  }

}
