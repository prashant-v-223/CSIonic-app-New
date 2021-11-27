import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {

  single: any[] = [
    {
      name: "Bitcoin",
      value: 60
    },
    {
      name: "Ethereum",
      value: 20
    },
    {
      name: "BNB",
      value: 20
    },
  ];

  view: any[] = [300, 200];

  // options
  gradient: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#1c0c5b', '#88E0EF', '#FF5151']
  };

  constructor() { }

  ngOnInit() { }

}
