import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SIPService } from 'src/app/shared/services/sip.service';

@Component({
  selector: 'app-sip-created',
  templateUrl: './sip-created.page.html',
  styleUrls: ['./sip-created.page.scss'],
})
export class SipCreatedPage implements OnInit {

  sipData: any = null;
  coins = [];

  constructor(
    private sipService: SIPService,
    private modalController: ModalController
  ) {
    this.sipData = this.sipService.getSIPData();
    this.coins = this.sipData.package.coins.map(coin => coin.currencyId);
  }

  ngOnInit() {
  }

  onBackHomeClick() {
    this.modalController.dismiss(null, '', 'SuccessModal');
  }

}
