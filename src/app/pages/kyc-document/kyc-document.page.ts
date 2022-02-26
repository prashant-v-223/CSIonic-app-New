import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { COPY } from 'src/app/shared/helper/const';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-kyc-document',
  templateUrl: './kyc-document.page.html',
  styleUrls: ['./kyc-document.page.scss'],
})
export class KYCDocumentPage implements OnInit {

  CONSTANT: any = COPY;
  showIdCardList: boolean = false;

  user: any;

  constructor(
    private navCtrl: NavController,
    private userService: UserService
  ) { }

  ngOnInit() {}

  ionViewDidEnter(): void {
    this.user = this.userService.getUserFromStorage();
    console.log('this.user', this.user);
  }

  onIDVerify(type: string) {
    this.navCtrl.navigateForward(['/dashboard/kyc-document/id-verification', { type: type }]);
  }

  onBack() {
    this.navCtrl.navigateForward('/dashboard/menu');
  }

}
