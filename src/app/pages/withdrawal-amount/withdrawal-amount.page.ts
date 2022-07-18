import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonInput, ModalController, NavController, ToastController } from '@ionic/angular';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { SIPService } from 'src/app/shared/services/sip.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BankDetailsService } from '../bank-details/bank-details.service';
import { AddAmountPage } from '../add-amount/add-amount.page';
import { SuccessFailScreenPage } from '../success-fail-screen/success-fail-screen.page';

@Component({
  selector: 'app-withdrawal-amount',
  templateUrl: './withdrawal-amount.page.html',
  styleUrls: ['./withdrawal-amount.page.scss'],
})
export class WithdrawalAmountPage implements OnInit {

  userId: string;
  disabled : boolean = true;
  depositAmount: string = '';
  BankDataResponse : [] = [];
  depositAmountResponse : [] = [];
  isLoading: boolean = false;
  maxWithdrawalAmounts:number = 0;
  minWithdrawalAmounts:number = 1000;
  stepperSteps = "amountSet";
  amount: number = 0;
  isAmountValid = false;
  config;

  @Output() transactionStatus;
  @Output() transactionType;
  @Output() transactionAmount;

  constructor(private modalController: ModalController,private navCtrl: NavController,private userService: UserService,public toastController: ToastController,private configurationService:ConfigurationService,public sipService: SIPService,private transactionService:TransactionsService) { }
  async ngOnInit() {
    const user = this.userService.getUserFromStorage();
    this.config = await this.configurationService.getConfiguration();
    this.minWithdrawalAmounts = this.config.minimumWithdrawalAmount;
    if (!user) this.onBack();
    this.userId = user._id;
    this.GetBankInfo(this.userId);
  }

  omit_special_char(e) {
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }


  async GetBankInfo(userId:string)
  {
    try
    {
      this.BankDataResponse = await this.userService.getUserBankDetails(userId);
      this.BankDataResponse = this.BankDataResponse['data'];
      this.maxWithdrawalAmounts = this.BankDataResponse['amount'];
    }
    catch (e)
    {
      const toast = await this.toastController.create({
        message: e,
        duration: 2000,
      });
      await toast.present();
    }
  }

  amountForm = new FormGroup({
    withdrawalAmount: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+\.[0-9]{2}$/),Validators.min(1),Validators.max(this.maxWithdrawalAmounts)]),
  });

  onBack() {
    this.navCtrl.navigateBack('/tabs/profile');
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
      this.amount <= this.maxWithdrawalAmounts && this.amount >= this.minWithdrawalAmounts;
  }

  openNextStep() {
    if (this.stepperSteps === "amountSet") {
      this.stepperSteps = "withdrawAmount";
    }
  }

  openBackStep() {
    if (this.stepperSteps === "withdrawAmount") {
      this.stepperSteps = "amountSet";
    }
  }


   withdrawalAmount()
  {
    this.isLoading = true;
    this.transactionService.depositWithdrawalAmount(this.amount,"withdrawal")
      .then(async(res) => {
      if (res.status =="SUCCESS")
      {
        this.isLoading = false;
        const successModal = await this.modalController.create({
          component: SuccessFailScreenPage,
          componentProps: {
            transactionStatus : true,
            transactionType : "Withdraw",
            transactionAmount : this.amount,
          },
          id: 'SuccessModal',
        });
        await successModal.present();
        //this.navCtrl.navigateBack('/my-wallet');
      }
      else
      {
        /* console.error("Something went wrong"); */
        this.isLoading = false;
        const successModal = await this.modalController.create({
          component: SuccessFailScreenPage,
          componentProps: {
            transactionStatus : false,
            transactionType : "Withdraw",
            transactionAmount : this.amount,
          },
          id: 'SuccessModal',
        });
        await successModal.present();
      }
    })
    .catch( async (error) => {
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
