import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CalendarComponentOptions, CalendarComponent } from 'ion2-calendar';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.page.html',
  styleUrls: ['./savings.page.scss'],
})
export class SavingsPage implements OnInit, AfterViewInit {

  today = "2020-01-19";
  calenderType = "string"
  calendarOptions: CalendarComponentOptions = {
    from: new Date(1)
  }
  @ViewChild('calender', {static: true}) calender: CalendarComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    
  }

}
