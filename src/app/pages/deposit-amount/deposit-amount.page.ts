import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BankDetailsService } from '../bank-details/bank-details.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AddAmountPage } from '../add-amount/add-amount.page';
import { ChoosePlanFrequencyPage } from '../choose-plan-frequency/choose-plan-frequency.page';
import { SuccessFailScreenPage } from '../success-fail-screen/success-fail-screen.page';

@Component({
  selector: 'app-deposit-amount',
  templateUrl: './deposit-amount.page.html',
  styleUrls: ['./deposit-amount.page.scss'],
})
export class DepositAmountPage implements OnInit {

  constructor(private navCtrl: NavController, private userService: UserService, private bankService: BankDetailsService, public toastController: ToastController, private alertCtrl: AlertController, private configurationService: ConfigurationService, private modalController: ModalController, private transactionService: TransactionsService) { }
  userId: string;
  disabled: boolean = true;
  depositAmount: string = '';
  BankDataResponse: [] = [];
  depositAmountResponse: [] = [];
  isLoading: boolean = false;
  stepperSteps = "amountSet";
  amount: number = 1;
  isAmountValid = true;
  utrNumberSet: string = '';
  @Input() newSIP;
  @Input() setCustomSelectedData;
  @Input() setCustomSelectedFrequency;
  @Input() setSelectedAmount;

  @Output() customSelectedData;
  @Output() customSelectedFrequency;
  @Output() customSelectedAmount;

  @Output() transactionStatus;
  @Output() transactionType;
  @Output() transactionAmount;

  backUrl: string = '';
  ngOnInit() {
    const user = this.userService.getUserFromStorage();
    if (!user) this.onBack();
    console.log(this.newSIP);
    this.userId = user._id;
    this.GetBankInfo(this.userId);
    console.log(this.setCustomSelectedData, this.setCustomSelectedFrequency);
    this.stepperSteps = "amountSet";
  }

  amountForm = new FormGroup({
    utrNumber: new FormControl('', [Validators.required]),
  });

  ionViewWillEnter() {
    this.stepperSteps = "amountSet";
  }
  async onBack() {

    this.modalController.dismiss(null, '', 'SuccessModal');
    if (this.newSIP != '' && this.newSIP != undefined) {
      const frequencyModal = await this.modalController.create({
        component: ChoosePlanFrequencyPage,
        componentProps: {
          customSelectedData: this.setCustomSelectedData,
          customSelectedFrequency: this.setCustomSelectedFrequency,
          customSelectedAmount: this.setSelectedAmount,
        },
        id: 'FrequencyModal',
      });
      await frequencyModal.present();

      this.navCtrl.navigateBack('/packages/' + this.newSIP);
      this.backUrl = '/packages/' + this.newSIP;
    }
    else {
      this.backUrl = '/my-wallet';
      this.navCtrl.navigateBack('/my-wallet');
    }
  }

  async GetBankInfo(userId: string) {
    try {
      this.BankDataResponse = await this.userService.getUserBankDetails(userId);
      this.BankDataResponse = this.BankDataResponse['data'];
      console.log(this.BankDataResponse);
    }
    catch (e) {
      const toast = await this.toastController.create({
        message: e,
        duration: 2000,
      });
      console.log(e);
      await toast.present();
    }
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
      this.amount > 0;
  }

  async openNextStep() {
    if (this.stepperSteps === "amountSet") {
      this.stepperSteps = "depositAmount";
    }
  }

  openBackStep() {
    if (this.stepperSteps === "depositAmount") {
      this.stepperSteps = "amountSet";
    }
  }

  addDeposit() {
    this.isLoading = true;
    this.transactionService.depositWithdrawalAmount(this.amount, "deposit", this.amountForm.controls['utrNumber'].value)
      .then(async (res) => {
        if (res.status == "SUCCESS") {
          this.isLoading = false;
          this.amountForm.reset();
          if (this.newSIP != '' && this.newSIP != undefined) {
            this.modalController.dismiss(null, '', 'SuccessModal');
          }
          const successModal = await this.modalController.create({
            component: SuccessFailScreenPage,
            componentProps: {
              transactionStatus: true,
              transactionType: "Deposit",
              transactionAmount: this.amount,
            },
            id: 'SuccessModal',
          });
          await successModal.present();
        }
        else {
          const successModal = await this.modalController.create({
            component: SuccessFailScreenPage,
            componentProps: {
              transactionStatus: false,
              transactionType: "Deposit",
              transactionAmount: this.amount,
            },
            id: 'SuccessModal',
          });
          this.isLoading = false;
          await successModal.present();
        }
      })
      .catch(async (error) => {
        console.error(error);
        this.isLoading = false;
      })
      .finally(() => {
        this.isLoading = false;
      });
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
