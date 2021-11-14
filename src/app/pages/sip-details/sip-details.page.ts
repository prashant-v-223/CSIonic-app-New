import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sip-details',
  templateUrl: './sip-details.page.html',
  styleUrls: ['./sip-details.page.scss'],
})
export class SipDetailsPage implements OnInit {

  selectedTime: string = '3y';

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onSelectTime(time) {
    this.selectedTime = time;
  }

  onBack() {
    this.navCtrl.navigateBack('/dashboard');
  }

}
