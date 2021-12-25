import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {

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
