import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Chart } from 'chart.js';

import { COPY, COINS } from 'src/app/shared/helper/const';
import { PackagesService } from 'src/app/shared/services/packages.service';
import { SIPService } from 'src/app/shared/services/sip.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ChoosePlanFrequencyPage } from '../choose-plan-frequency/choose-plan-frequency.page';
import { SuccessFailScreenPage } from '../success-fail-screen/success-fail-screen.page';

enum SIPSteps {
  FREQUENCY,
  AMOUNT,
  CREATED,
}

export enum RequiredVerificationEnum {
  AADHAR_CARD = 'Aadhar card',
  BANK_ACCOUNT = 'Bank details',
  PAN_CARD = 'PAN card',
  SELFIE = 'Photo'
}

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.page.html',
  styleUrls: ['./portfolio-view.page.scss'],
})
export class PortfolioViewPage implements OnInit {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: any;
  CONSTANT = COPY;
  COINS = COINS;
  eSignURL = '';
  chartLabel: any;
  chartData: any;
  coinCode: string;
  @Output() coinList: any;
  @Output() packageList: any;
  @Output() page: any;
  withdrawBtn: string = 'false';
  listBtn: string = 'false';
  time_frame: boolean = false;
  public segment: string = 'day';
  showLoader = true;
  withdrawalStatus = "complete";
  RequiredVerificationEnum = RequiredVerificationEnum;
  pequiredVerificationData = {
    [RequiredVerificationEnum.AADHAR_CARD]: {
      link: '/kyc-document/id-verification',
      queryParams: { type: 'id-verify' }
    },
    [RequiredVerificationEnum.PAN_CARD]: {
      link: '/kyc-document/id-verification',
      queryParams: { type: 'PAN' }
    },
    [RequiredVerificationEnum.BANK_ACCOUNT]: {
      link: '/bank-details',
      queryParams: {}
    },
    [RequiredVerificationEnum.SELFIE]: {
      link: '/kyc-document/id-verification',
      queryParams: { type: 'selfie' }
    }
  };

  id: string;
  view: 'sip' | 'package';
  user: any;
  canStartSIP = false;
  pendingVerificationList: RequiredVerificationEnum[] = [];

  sipDetails: any;
  packageDetails: any;

  packageCalculatedDetails = {
    coins: [],
    returnPercentage: null,
    returnYears: null,
  };

  SIPStepStatus = SIPSteps.FREQUENCY;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    public modalController: ModalController,
    private packagesService: PackagesService,
    private sipService: SIPService,
    private userService: UserService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    this.user = this.userService.getUserFromStorage();
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.view = this.router.url.startsWith('/sip') ? 'sip' : 'package';
    });
    this.withdrawBtn = localStorage.getItem('withdraw');
    this.listBtn = localStorage.getItem('list');
  }

  ngAfterViewInit() {
    this.checkUserCanStartSIP();
    this.lineChartMethod();
  }

  async lineChartMethod(duration?: any, interval?: string, symbol?: string) {

    if (duration != undefined && interval != undefined) {
      this.time_frame = true;
      const res = await this.sipService.getChartDetailsPackage(this.coinCode, duration, interval);
      this.chartLabel = res.data?.date;
      this.chartData = res.data?.price;
    }
    else {
      this.time_frame = true;
      const res = await (this.view === 'sip'
        ? this.sipService.getSIPDetails(this.id)
        : this.packagesService.getPackageDetails(this.id));

      if (res.status === this.CONSTANT.SUCCESS && res.data) {
        if (this.view === 'sip') {
          this.sipDetails = res.data.sip;
          this.packageDetails = this.sipDetails.packageId;
        } else {
          this.packageDetails = res.data.package;
        }
        this.showLoader = false;
      }
      this.chartLabel = res.data?.chartData?.date;
      this.chartData = res.data?.chartData?.price;
      this.withdrawalStatus = res.data?.sip?.status;
      this.coinCode = res.data?.sip?.packageId ? res.data?.sip?.packageId._id : res.data?.package?._id;
    }
    this.time_frame = false;
    let context: CanvasRenderingContext2D = this.lineCanvas.nativeElement.getContext('2d');
    let grad = context.createLinearGradient(0, 0, 0, 200);
    grad.addColorStop(0, '#2B7979');
    grad.addColorStop(1, '#fff');
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartLabel,
        datasets: [
          {
            data: this.chartData,
            backgroundColor: grad,
            borderColor: 'rgba(43, 121, 121, 1)',
            borderCapStyle: 'butt',
            borderWidth: 1,
            fill: true,
            tension: 0.5,
            pointRadius: 0,
            pointHoverRadius: 0,
            spanGaps: false,
          }
        ]
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false
          },
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

  checkUserCanStartSIP() {
    this.canStartSIP = false;
    this.pendingVerificationList = [];
    if (this.view === 'sip') {
      this.canStartSIP = true;
      return;
    }

    const list: RequiredVerificationEnum[] = [];
    if (!this.user?.kycDocuments?.bankAccount)
      list.push(RequiredVerificationEnum.BANK_ACCOUNT);
    if (!this.user?.kycDocuments?.adhaarCard)
      list.push(RequiredVerificationEnum.AADHAR_CARD);
    if (!this.user?.kycDocuments?.panCard)
      list.push(RequiredVerificationEnum.PAN_CARD);
    if (!this.user?.kycDocuments?.selfie)
      list.push(RequiredVerificationEnum.SELFIE);

    this.canStartSIP = !list.length;
    this.pendingVerificationList = list;
  }

  showConfirm() {
    this.alertController.create({
      header: 'Confirm Withdraw',
      message: '1% TDS will be deducted from your withdrawal amount. Are you sure you want to withdraw?',
      buttons: [
        {
          text: 'cancel',
        },
        {
          text: 'confirm',
          handler: () => {
            this.sipService.withdrawSIP(this.id).then(res => {
              this.withdrawalResponse('success');
              // this.navCtrl.back();
            }).catch((e) => {
              if (e.status === 400) {
                this.showToast(e.error.error);
              }
              if (e.status === 500) {
                this.showToast("Something went wrong.");
              }
              if (e.status === 404) {
                this.showToast("SIP not found.");
              }
              this.withdrawalResponse('fail');
            });
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  async withdrawalResponse(type) {
    if (type=="success") {
      const successModal = await this.modalController.create({
        component: SuccessFailScreenPage,
        componentProps: {
          transactionStatus: true,
          transactionType: "Withdrawal",
          page: "sip",
        },
        id: 'SuccessModal',
      });
      await successModal.present();
    } else {
      const successModal = await this.modalController.create({
        component: SuccessFailScreenPage,
        componentProps: {
          transactionStatus: false,
          transactionType: "Withdrawal",
        },
        id: 'SuccessModal',
      });
      await successModal.present();
    }
  }

  async showToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000
    });
    toast.present();
  }

  async loadDetails() {
    if (!this.id) {
      this.goBack();
      return;
    }

    this.showLoader = true;
    try {
      const res = await (this.view === 'sip'
        ? this.sipService.getSIPDetails(this.id)
        : this.packagesService.getPackageDetails(this.id));

      if (res.status === this.CONSTANT.SUCCESS && res.data) {
        if (this.view === 'sip') {
          this.sipDetails = res.data.sip;
          this.packageDetails = this.sipDetails.packageId;
        } else {
          this.packageDetails = res.data.package;
        }

        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting package details', e);
      this.goBack();
    }
  }

  /* fillPackageCalculatedDetails() {
    this.packageCalculatedDetails.coins = this.packageDetails.coins.map(
      (coin) => coin.currencyId
    );
    this.packageCalculatedDetails.returnYears =
      this.packageCalculatedDetails.returnPercentage = null;

    if ('_3' in this.packageDetails.yearlyReturns) {
      this.packageCalculatedDetails.returnYears = 3;
      this.packageCalculatedDetails.returnPercentage =
        this.packageDetails.yearlyReturns['_3'];
    } else if ('_1' in this.packageDetails.yearlyReturns) {
      this.packageCalculatedDetails.returnYears = 1;
      this.packageCalculatedDetails.returnPercentage =
        this.packageDetails.yearlyReturns['_1'];
    }
  } */

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    this.lineChart.destroy();
    var durationMonth = this.segment.split("-");
    this.lineChartMethod(Number(durationMonth[0]), durationMonth[1]);
  }

  async openSIPStep() {
    if (this.view === 'sip') return;

    this.sipService.setSIPData('reset', null);

    // step 1
    this.sipService.setSIPData('package', {
      package: this.packageDetails,
    });

    // step 2
    const frequencyModal = await this.modalController.create({
      component: ChoosePlanFrequencyPage,
      id: 'FrequencyModal',
    });
    await frequencyModal.present();
  }

  transactionsList() {
    this.navCtrl.navigateBack('/sip-transaction-list/' + this.id);
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/portfolio');
  }

  completeKYC() {
    if (!this.user?.kycDocuments?.bankAccount) {
      this.navCtrl.navigateBack('/bank-details');
    }
    else {
      this.navCtrl.navigateBack('/kyc-document');
    }
  }
}
