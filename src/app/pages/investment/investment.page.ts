import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.page.html',
  styleUrls: ['./investment.page.scss'],
})
export class InvestmentPage implements OnInit {

  isCategoryView = true;

  constructor() { }

  ngOnInit() {
  }

  toggleView(){
    this.isCategoryView = !this.isCategoryView;
  }

}
