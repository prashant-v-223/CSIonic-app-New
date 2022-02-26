import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { COLORS, COPY } from 'src/app/shared/helper/const';
import { SIPService } from 'src/app/shared/services/sip.service';

@Component({
  selector: 'app-add-amount',
  templateUrl: './add-amount.page.html',
  styleUrls: ['./add-amount.page.scss'],
})
export class AddAmountPage implements OnInit {
  sipData: any = null;
  chartData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };

  amountCtrl = new FormControl(null, [
    Validators.required,
    Validators.pattern('\\d+'),
    Validators.min(0),
  ]);
  CONSTANT: any = COPY;

  showLoader = false;

  constructor(private navCtrl: NavController, private sipService: SIPService,
    public toastController: ToastController
    ) {
    this.sipData = this.sipService.getSIPData();
    this.prepareChartData();
  }

  ngOnInit() {}

  prepareChartData() {
    const labels: string[] = [];
    const dataValues: number[] = [];
    const backgroundColors: string[] = [];

    this.sipData.package.coins.forEach((coin, index) => {
      labels.push(coin.currencyId.fullName);
      dataValues.push(coin.allocation);
      backgroundColors.push(COLORS[index % this.sipData.package.coins.length]);
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: backgroundColors,
        },
      ],
    };
  }

  setAmount(amount: number) {
    if (this.amountCtrl.value === amount)
      return;

    this.amountCtrl.patchValue(amount);
    this.amountCtrl.updateValueAndValidity();
  }

  async createSIP() {
    if (!this.amountCtrl.valid) return;

    this.sipService.setSIPData('amount', { installmentAmount: this.amountCtrl.value });

    try {
      this.showLoader = true;
      const sipRes = await this.sipService.addSIP();
      if (sipRes.status === this.CONSTANT.SUCCESS){
        this.sipService.setSIPData('reset', null);
        const toast = await this.toastController.create({
          message: 'SIP created successfully',
          duration: 2000
        });
        toast.present();
        this.navCtrl.navigateBack('/dashboard');
      } else
        this.handleSIPCreateError();
    } catch(e) {
      console.log('Error while creating SIP: ', e);
      this.handleSIPCreateError();
    } finally {
      this.showLoader = false;
    }
  }

  async handleSIPCreateError() {
    const toast = await this.toastController.create({
      message: 'There was issue while creating SIP, please try again',
      duration: 2000
    });
    toast.present();
  }

  onBack() {
    this.navCtrl.back();
  }
}
