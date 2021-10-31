import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-choose-plan-frequency',
  templateUrl: './choose-plan-frequency.page.html',
  styleUrls: ['./choose-plan-frequency.page.scss'],
})
export class ChoosePlanFrequencyPage implements OnInit {

  selectFrequency: any;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onSelectFrequency(type) {
    this.selectFrequency = type;
  }

  onBack() {
    this.navCtrl.back();
  }

}
