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
  ) { }

  ngOnInit() {
  }

  viewWallet() {
    this.navCtrl.navigateForward("/dashboard/view-wallet");
  }

  viewTransactions() {
    this.navCtrl.navigateForward('/dashboard/transaction-list');
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
