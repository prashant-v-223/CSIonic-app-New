import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) {
    const userData = {
      userId: "61c6f8683f2c6a2b683c2744"
    };
    localStorage.setItem('userDetails', JSON.stringify(userData));
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
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    console.log("userData", userData);

    if (userData && userData.userId) {
      this.navCtrl.navigateForward(['/dashboard/bank-details', { id: userData.userId }]);
    } else {
      this.navCtrl.navigateForward('/dashboard/bank-verification');
    }
  }

  onKYCDocument() {
    this.navCtrl.navigateForward('/dashboard/kyc-document');
  }

  signOut() {
    localStorage.clear();
    Auth.signOut();
    this.navCtrl.navigateBack('/login');
  }

  onBack() {
    this.navCtrl.navigateBack('/dashboard');
  }
}
