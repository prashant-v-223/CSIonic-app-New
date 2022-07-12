import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BankDetailsService } from '../bank-details/bank-details.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-deposit-amount',
  templateUrl: './deposit-amount.page.html',
  styleUrls: ['./deposit-amount.page.scss'],
})
export class DepositAmountPage implements OnInit {

  constructor(private navCtrl: NavController,private userService: UserService,private bankService: BankDetailsService,public toastController: ToastController,private alertCtrl: AlertController,private configurationService:ConfigurationService,private transactionService:TransactionsService) { }
  userId: string;
  disabled : boolean = true;
  depositAmount: string = '';
  BankDataResponse : [] = [];
  depositAmountResponse : [] = [];
  isLoading: boolean = false;
  stepperSteps = "amountSet";
  amount: number = 1;
  isAmountValid = true;
  utrNumberSet:string='';
  ngOnInit() {
    const user = this.userService.getUserFromStorage();
    if (!user) this.onBack();

    this.userId = user._id;
    this.GetBankInfo(this.userId);
  }

  amountForm = new FormGroup({
    utrNumber: new FormControl('',[Validators.required]),
  });

  /* omit_special_char(e) {
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  } */

  onBack() {
    this.navCtrl.navigateBack('/my-wallet');
  }

  async GetBankInfo(userId:string)
  {
    try
    {
        // this.BankDataResponse = await this.configurationService.getConfiguration();
        this.BankDataResponse = await this.userService.getUserBankDetails(userId);

        this.BankDataResponse = this.BankDataResponse['data'];
        console.log(this.BankDataResponse);
      }
      catch (e)
      {
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

  addDeposit()
  {
    this.isLoading = true;
    this.transactionService.depositWithdrawalAmount(this.amount,"deposit",this.amountForm.controls['utrNumber'].value)
      .then((res) => {
      if (res.status =="SUCCESS")
      {
        this.isLoading = false;
        this.amountForm.reset();
        this.navCtrl.navigateBack('/my-wallet');
      }
      else
      {
        console.error("Something went wrong");
        this.isLoading = false;
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
