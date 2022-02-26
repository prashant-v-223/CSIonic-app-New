import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() chartData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[]
  };

  @ViewChild('pieChart') pieCanvas: ElementRef;

  pieChart: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.chartData) {
      this.initPieChart();
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.initPieChart();
  }

  initPieChart() {
    if (!this.chartData || !this.pieCanvas?.nativeElement)
      return;

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: this.chartData,
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
