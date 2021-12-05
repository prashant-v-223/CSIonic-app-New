import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {

  @ViewChild('pieChart') pieCanvas: ElementRef;

  pieChart: any;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.initPieChart();
  }

  initPieChart() {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Bitcoin', 'Ethereum', 'BNB'],
        datasets: [{
          label: 'Pie chart',
          data: [270, 150, 50],
          backgroundColor: [
            '#1c0c5b',
            '#88E0EF',
            '#FF5151'
          ],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true
          },
          legend: {
            labels: {
              font: {
                size: 15,
                weight: "500",
                family: "Roboto",
              },
              color: "#000",
              boxWidth: 15,
              boxHeight: 15,
            },
            position: "bottom"
          },
        },

      }
    });
  }

}
