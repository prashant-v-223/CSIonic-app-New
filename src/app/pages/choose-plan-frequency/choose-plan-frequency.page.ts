import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { SIPService } from 'src/app/shared/services/sip.service';

@Component({
  selector: 'app-choose-plan-frequency',
  templateUrl: './choose-plan-frequency.page.html',
  styleUrls: ['./choose-plan-frequency.page.scss'],
})
export class ChoosePlanFrequencyPage implements OnInit {

  selectFrequency: any;
  selectedDay: any;
  week: any[] = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  startOfMonth = moment().startOf('month').format();
  endOfMonth = moment().endOf('month').format();
  fifteenDays: Date;
  isOpened: boolean = true;

  frequencyObject?: {
    type: 'daily' | 'weekly' | 'monthly';
    weekDay?:
      | 'SUNDAY'
      | 'MONDAY'
      | 'TUESDAY'
      | 'WEDNESDAY'
      | 'THURSDAY'
      | 'FRIDAY'
      | 'SATURDAY';
    monthDay?: number;
  };
  isFrequencyValid = false;

  constructor(
    private navCtrl: NavController,
    private sipService: SIPService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }

  onSelectFrequency(type) {
    this.selectFrequency = type;
    this.frequencyObject = {
      type: this.selectFrequency
    };
    this.updateValidity();
  }

  onSelectDay(day) {
    this.selectedDay = day;
    this.frequencyObject.weekDay = day;
    console.log('this.frequencyObject: ', this.frequencyObject);
    this.updateValidity();
  }

  onSelectDate(date: number) {
    this.frequencyObject.monthDay = date;
    this.updateValidity();
  }

  updateValidity() {
    this.isFrequencyValid = this.sipService.isSIPFrequencyValid(this.frequencyObject);
    console.log('this.frequencyObject: ', this.frequencyObject);
    this.cdr.detectChanges();
  }

  onBack() {
    this.navCtrl.back();
  }

  onNext() {
    this.sipService.setSIPData('plan-frequency', this.frequencyObject);
    this.navCtrl.navigateRoot('/add-amount');
  }

}
