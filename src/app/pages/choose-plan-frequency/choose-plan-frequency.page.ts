import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-choose-plan-frequency',
  templateUrl: './choose-plan-frequency.page.html',
  styleUrls: ['./choose-plan-frequency.page.scss'],
})
export class ChoosePlanFrequencyPage implements OnInit {

  selectFrequency: any;
  selectedDay: any;
  week: any[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  startOfMonth = moment().startOf('month').format();
  endOfMonth = moment().endOf('month').format();
  fifteenDays: Date;
  isOpened: boolean = true;

  constructor(
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
  }

  onSelectFrequency(type) {
    this.selectFrequency = type;
  }

  onSelectDay(day) {
    this.selectedDay = day;
  }

  onBack() {
    this.navCtrl.back();
  }

  onGoDashboard() {
    this.navCtrl.navigateRoot('/add-amount');
  }

}
