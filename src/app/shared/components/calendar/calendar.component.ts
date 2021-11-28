import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { getDaysArray } from '../../helper/utiles';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  weekList = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  today = moment();
  dateList = getDaysArray(this.today.format('YYYY'), this.today.format('M'),);
  selectedDate: any = this.today.format('D');

  constructor() {
  }

  ngOnInit() {
  }

  onSelectDate(date) {
    this.selectedDate = date;
  }

}
