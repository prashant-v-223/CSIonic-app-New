import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-amount',
  templateUrl: './add-amount.page.html',
  styleUrls: ['./add-amount.page.scss'],
})
export class AddAmountPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onGoDashboard() {
    this.navCtrl.navigateForward('/dashboard');
  }

  onBack() {
    this.navCtrl.back();
  }

}
