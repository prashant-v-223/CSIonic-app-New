import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-success-fail-screen',
  templateUrl: './success-fail-screen.page.html',
  styleUrls: ['./success-fail-screen.page.scss'],
})
export class SuccessFailScreenPage implements OnInit {
  screenShow: string = 'success';
  // showLoader = false;
  redirectURL: string = '';
  pagetype : string = '';
  @Input() transactionStatus;
  @Input() transactionType;
  @Input() transactionAmount;
  @Input() page;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.screenShow = 'success';
    if (this.page == 'sip') {
      this.pagetype = 'sip';
    } else {
      this.pagetype = 'payment';
    }
  }

  async ngAfterViewInit() {
    if (this.transactionStatus == true) {
      this.screenShow = 'success';
    }
    else {
      this.screenShow = 'fail';
    }

    if (this.transactionType == 'Deposit') {
      this.redirectURL = 'deposit-amount'
    }
    else {
      this.redirectURL = 'withdrawal-amount'
    }
  }

  handleFooterButtonClick() {
    this.onBackHomeClick();
  }

  onBackHomeClick() {
    this.modalController.dismiss(null, '', 'SuccessModal');
  }
}
