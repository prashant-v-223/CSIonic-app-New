import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  page = 'TimeTable';
  selectOrChange = 'Select';
  index: any;
  iconsOnly = false;
  userData: any;
  subscription: any;
  constructor(
   ) {
  }
  ionViewDidLoad() {

  }

  ngOnInit() {
  }
}
