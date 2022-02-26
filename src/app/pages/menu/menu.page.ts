import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Auth } from 'aws-amplify';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  user: any;

  constructor(
    private navCtrl: NavController,
    private userService: UserService
  ) {
    this.user = this.userService.getUserFromStorage();
  }

  ngOnInit() {
  }

  viewWallet() {
    this.navCtrl.navigateForward("/dashboard/view-wallet");
  }

  viewTransactions() {
    this.navCtrl.navigateForward('/dashboard/transaction-list');
  }

  onBankDetails() {
    this.navCtrl.navigateForward(['/dashboard/bank-details']);
  }

  onKYCDocument() {
    this.navCtrl.navigateForward('/dashboard/kyc-document');
  }

  async signOut() {
    localStorage.clear();
    await Auth.signOut();
    this.navCtrl.navigateBack('/login');
  }

  onBack() {
    this.navCtrl.navigateBack('/dashboard');
  }
}
