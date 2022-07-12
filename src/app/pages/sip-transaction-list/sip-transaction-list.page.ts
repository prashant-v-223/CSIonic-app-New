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

  constructor(
    private sipService: SIPService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];
    console.log(this.id);
    this.loadDetails();
  }

  async loadDetails() {
    const res = await this.sipService.getSIPTransectionDetails(this.id);
    this.transactionList = res.data?.data;
  }
}
