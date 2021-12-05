import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {

  data: any[] = [
    {
      name: "2018",
      series: [
        {
          date: "13/11/2018",
          value: 29.22
        },
        {
          date: "14/11/2018",
          value: 29.45
        },
        {
          name: "15/11/2018",
          value: 30.22
        }, {
          name: "16/11/2018",
          value: 45.22
        },
        {
          name: "17/11/2018",
          value: 33.22
        },
        {
          name: "18/11/2018",
          value: 34.22
        },
        {
          name: "19/11/2018",
          value: 35.22
        },
        {
          name: "20/11/2018",
          value: 34.89
        },
        {
          name: "21/11/2018",
          value: 37.29
        },
        {
          name: "22/11/2018",
          value: 42.76
        },
        {
          name: "23/11/2018",
          value: 67.45
        },
        {
          name: "24/11/2018",
          value: 60.10
        },
        {
          name: "25/11/2018",
          value: 59.67
        },
        {
          name: "26/11/2018",
          value: 50.23
        },
        {
          name: "27/11/2018",
          value: 49.42
        },
        {
          name: "1/12/2018",
          value: 70.22
        },
        {
          name: "2/12/2018",
          value: 80.22
        },
        {
          name: "3/12/2018",
          value: 55.22
        }
      ]
    }
  ];

  @ViewChild('lineChart') lineCanvas: ElementRef;
  lineChart: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initLineChart();
  }

  initLineChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [2, 20, 50, 13, 45, 23, 45, 77, 35, 66, 79, 99],
        datasets: [{
          data: [2, 20, 50, 13, 45, 23, 45, 77, 35, 66, 79, 99],
          borderColor: "#2dd36f",
          fill: false
        }]
      },
      options: {
        responsive: true,
        elements: {
          point: {
            radius: 0
          }
        },
        plugins: {
          tooltip: {
            enabled: false
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            grid: {
              color: "#fff"
            },
            display: false
          },
          x: {
            display: false,
            grid: {
              color: "#fff"
            }
          }
        }

      }
    });
  }

}
