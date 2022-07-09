import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  IonInput,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { SIPService } from 'src/app/shared/services/sip.service';
// import { FormControl, Validators } from '@angular/forms';
import { COLORS, COPY } from 'src/app/shared/helper/const';
import { SipCreatedPage } from '../sip-created/sip-created.page';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-amount',
  templateUrl: './add-amount.page.html',
  styleUrls: ['./add-amount.page.scss'],
})
export class AddAmountPage implements OnInit {
  @ViewChild('amountInput') amountInput: IonInput;

  config;
  sipData: any = null;
  coins = [];
  chartData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };

  CONSTANT: any = COPY;

  showLoader = false;

  amount: number;
  isAmountValid = false;

  addFundError = false;

  constructor(
    public sipService: SIPService,
    public toastController: ToastController,
    private modalController: ModalController,
    private configurationService: ConfigurationService,
    private userService: UserService,
    // private navCtrl: NavController,
    private router:Router
  ) {
    this.sipData = this.sipService.getSIPData();
    this.prepareChartData();
  }

  async ngOnInit() {
    this.config = await this.configurationService.getConfiguration();
    this.setAmount(this.sipService?.getSIPData()?.package?.totalMinimumDepositAmount);
  }

  prepareChartData() {
    const labels: string[] = [];
    const dataValues: number[] = [];
    const backgroundColors: string[] = [];
    this.coins = [];

    this.sipData.package.coins.forEach((coin, index) => {
      labels.push(coin.currencyId.fullName);
      dataValues.push(coin.allocation);
      backgroundColors.push(COLORS[index % this.sipData.package.coins.length]);
      this.coins.push(coin.currencyId);
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

  setAmount(amountDigit: number | 'remove') {
    const amountString = String(this.amount);
    if (amountDigit === 'remove') {
      if (this.amount || this.amount === 0)
        this.amount = Number(
          amountString.substring(0, amountString.length - 1)
        );
    } else {
      this.amount =
        this.amount || this.amount === 0
          ? Number(amountDigit)
          : amountDigit;
    }

    this.isAmountValid =
      this.amount &&
      new RegExp('^\\d+$').test(String(this.amount)) &&
      this.amount <= this.config.sip.maxInstallmentAmount &&
      this.amount >= this.sipService?.getSIPData()?.package?.totalMinimumDepositAmount;
  }

  async createSIP() {
    this.addFundError = false;
    if (!this.isAmountValid) return;
    const user = this.userService.getUserFromStorage();
    // this.sipService.setSIPData('amount', { installmentAmount: this.amountCtrl.value });
    if (this.amount>=user.wallet) {
      this.addFundError = true;
      return;
    }
    this.sipService.setSIPData('amount', { installmentAmount: this.amount });

    try {
      this.showLoader = true;
      this.isAmountValid = false;
      const sipRes = await this.sipService.addSIP();
      if (sipRes.status === this.CONSTANT.SUCCESS) {
        // this.sipService.setSIPData('reset', null);
        /* const toast = await this.toastController.create({
          message: 'SIP created successfully',
          duration: 2000,
        }); */
        //toast.present();
        this.closeModal('success');

        // show the success screen
        const successModal = await this.modalController.create({
          component: SipCreatedPage,
          componentProps: {
            newSIP: sipRes.data
          },
          id: 'SuccessModal',
        });
        await successModal.present();
      } else this.handleSIPCreateError();
    } catch (e) {
      console.log('Error while creating SIP: ', e);
      this.handleSIPCreateError();
    } finally {
      this.showLoader = false;
      this.isAmountValid = true;
    }
  }

  async handleSIPCreateError() {
    const toast = await this.toastController.create({
      message: 'There was issue while creating SIP, please try again',
      duration: 2000,
    });
    toast.present();
    this.closeModal('error');
  }

  redirectAddFund() {
    this.router.navigateByUrl('/deposit-amount');
  }

  closeModal(status: 'dismissed' | 'success' | 'error') {
    this.modalController.dismiss(
      {
        status,
      },
      '',
      'AddMountModal'
    );
  }
}
