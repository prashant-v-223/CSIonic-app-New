import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {
  
  @ViewChild("barCanvas",{static: true}) barCanvas: ElementRef;
  @ViewChild("doughnutCanvas",{static: true}) doughnutCanvas: ElementRef;

  public barChart: Chart;
  public doughnutChart: Chart;
  constructor() { }
  
  ngOnInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul"],
        datasets: [
          {
            data: [26,84,49,20,30,35,96.00],
            barThickness: 20,
            borderRadius: 10,
            backgroundColor: [
              "rgba(43, 121, 121, 1)",
            ],
            borderColor: [
              "rgba(43, 121, 121, 1)",
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            display: false,
          },
        },
        scales: {
          y: {
            ticks: {
              callback: function(value, index, ticks) {
                return '$' + value;
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["22.5%","22.5%","50%"],
        datasets: [
          {
            data: [22.5,22.5,50],
            backgroundColor: [
              "#FF7438",
              "#515F6A",
              "#2B7979"
            ],
            // hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            color: "#FFFFFF",
            formatter: (value) => {
              return value + '%';
            },
            font: {
              weight: 'bold',
              size: 20,
            }
          }
        }
      }
    });
  }

}
