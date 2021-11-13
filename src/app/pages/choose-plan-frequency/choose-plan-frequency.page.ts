import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-choose-plan-frequency',
  templateUrl: './choose-plan-frequency.page.html',
  styleUrls: ['./choose-plan-frequency.page.scss'],
})
export class ChoosePlanFrequencyPage implements OnInit {

  selectFrequency: any;
  selectedDay: any;
  week: any[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  today = new Date();
  endDate: Date;
  fifteenDays: Date;

  constructor(
    private navCtrl: NavController
  ) {
    this.getEndDate();
  }

  ngOnInit() {
  }

  onSelectFrequency(type) {
    this.selectFrequency = type;
  }

  onSelectDay(day) {
    this.selectedDay = day;
  }

  getEndDate() {
    this.endDate = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
  }

  onBack() {
    this.navCtrl.back();
  }

  onGoDashboard() {
    this.navCtrl.navigateRoot('/add-amount');
  }

}
