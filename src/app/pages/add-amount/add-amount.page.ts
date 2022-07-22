import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  IonInput,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { SIPService } from 'src/app/shared/services/sip.service';
import { COLORS, COPY } from 'src/app/shared/helper/const';
import { SipCreatedPage } from '../sip-created/sip-created.page';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { DepositAmountPage } from '../deposit-amount/deposit-amount.page';
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

  @Input() customSelectedData;
  @Input() customSelectedFrequency;
  @Input() customSelectedAmount;

  @Output() setCustomSelectedData;
  @Output() setCustomSelectedFrequency;
  @Output() setSelectedAmount;

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
    private router:Router
    ) {
    this.sipData = this.sipService.getSIPData();
    this.prepareChartData();
  }

  async ngOnInit() {
    console.log(this.customSelectedData,this.customSelectedFrequency);
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

    if(this.customSelectedAmount!='' && this.customSelectedAmount!=undefined)
    {
      this.amount = this.customSelectedAmount;
      this.customSelectedAmount = undefined;
    }

    this.isAmountValid =
    this.amount &&
    this.amount <= this.config.sip.maxInstallmentAmount &&
    this.amount >= this.sipService?.getSIPData()?.package?.totalMinimumDepositAmount;
  }

  async createSIP() {
    this.addFundError = false;
    if (!this.isAmountValid) return;
    const user = this.userService.getUserFromStorage();
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
      } else
      {
        this.closeModal('success');
        // show the success screen
        const successModal = await this.modalController.create({
          component: SipCreatedPage,
          componentProps: {
            newSIP: ''
          },
          id: 'SuccessModal',
        });
        await successModal.present();
      }
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

  async redirectAddFund() {
    this.closeModal('error');
    const successModal = await this.modalController.create({
      component: DepositAmountPage,
      componentProps: {
        newSIP: this.sipData.package._id,
        setCustomSelectedData: this.customSelectedData,
        setCustomSelectedFrequency: this.customSelectedFrequency,
        setSelectedAmount : this.amount,
      },
      id: 'SuccessModal',
    });
    await successModal.present();
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

  numbersOnly(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
        return false;
    }
    return true;
  }
}
