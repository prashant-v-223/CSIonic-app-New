import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { COPY } from 'src/app/shared/helper/const';


@Component({
  selector: 'app-kyc-document',
  templateUrl: './kyc-document.page.html',
  styleUrls: ['./kyc-document.page.scss'],
})
export class KYCDocumentPage implements OnInit {

  CONSTANT: any = COPY;
  showIdCardList: boolean = false;

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  onIDVerify(type: string) {
    this.navCtrl.navigateForward(['/dashboard/kyc-document/id-verification', { type: type }]);
  }

  onBack() {
    this.navCtrl.navigateForward('/dashboard/menu');
  }

}
