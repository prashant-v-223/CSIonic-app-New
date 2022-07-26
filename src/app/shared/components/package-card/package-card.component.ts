import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { SIPService } from '../../services/sip.service';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss'],
})
export class PackageCardComponent implements OnInit, OnChanges {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: any;
  @Input() view: 'package' | 'sip' | 'coin' = 'package';
  @Input() package: any;
  @Input() navigationLink = '/';
  @Input() coinList: any;
  @Input() packageList: any;
  coinCode: string = "";
  chartDateLabel: any;
  chartPriceLabel: any;
  chartHide: boolean = false;
  totalMinimumDepositAmount: number = 0;
  coins = [];
  coinData: any;
  constructor(
    private sipService: SIPService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.package)
      this.populateCoins();
  }

  get packageObj() {
    return ['package', 'coin'].includes(this.view) ? this.package : this.package.packageId;
  }

  ngOnInit() {
    this.packageList;
    this.coinList;
    if (this.coinList == undefined) {
      this.packageList.forEach(element => {
        this.totalMinimumDepositAmount = this.totalMinimumDepositAmount + parseInt(element.currencyId.minimumDepositAmount);
      });
    }
    this.totalMinimumDepositAmount = this.package?.packageId?.totalMinimumDepositAmount ? this.package?.packageId?.totalMinimumDepositAmount : this.totalMinimumDepositAmount;
    this.coinCode = this.coinList != undefined ? this.coinList[0]?.currencyId.baseAsset : this.package?.packageId?._id;
  }

  ngAfterViewInit() {
    this.lineChartMethod(this.coinCode);
  }

  async lineChartMethod(coinCodeName: string) {
    if (coinCodeName != '') {
      try {
        if (this.package?.packageId?._id != undefined && this.package?.packageId?._id != '') {
          this.coinData = await this.sipService.getChartDetailsPackage(coinCodeName, "3", "month");
        }
        else {
          this.coinData = await this.sipService.getChartDetails(coinCodeName, "3", "month");
        }
        this.chartDateLabel = this.coinData.data.date;
        this.chartPriceLabel = this.coinData.data.price;
        this.chartHide = false;
      }
      catch (error) {
        this.chartHide = true;
      }
    }
    let context: CanvasRenderingContext2D = this.lineCanvas.nativeElement.getContext('2d');
    let grad = context.createLinearGradient(0, 0, 0, 100);
    grad.addColorStop(0, '#2B7979');
    grad.addColorStop(1, '#fff');


    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartDateLabel,
        datasets: [
          {
            data: this.chartPriceLabel,
            backgroundColor: grad,
            borderColor: 'rgba(43, 121, 121, 1)',
            borderCapStyle: 'butt',
            borderWidth: 1,
            fill: true,
            tension: 0.5,
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#FFFFFF',
            pointRadius: 0,
            pointHitRadius: 5,
            pointBorderWidth: 0.7,
            pointHoverBorderWidth: 5,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#FFFFFF',
            pointHoverBorderColor: 'rgba(43, 121, 121, 1)',
            spanGaps: false,
          }
        ]
      },
      options: {
        layout: {
          padding: {
            bottom: 0,
            left: 0,
            right: 5
          }
        },
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
            grid: {
              drawBorder: false,
              display: false
            },
            ticks: {
              display: false
            }
          },
          x: {
            grid: {
              drawBorder: false,
              display: false
            },
            ticks: {
              display: false
            }
          }
        }
      }
    });
  }

  populateCoins() {
    this.coins = this.packageObj.coins.map(coin => coin.currencyId);
  }
}
