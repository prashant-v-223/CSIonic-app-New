import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BankDetailsService } from '../bank-details/bank-details.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

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

  ngOnInit() {
    const user = this.userService.getUserFromStorage();
    if (!user) this.onBack();

    this.userId = user._id;
    this.GetBankInfo();
  }

  amountForm = new FormGroup({
    depositAmount: new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    utrNumber: new FormControl('',[Validators.required]),
  });

  /* GetDeposit()
  {
    if(this.AmountForm.controls['deposit_amount'].value > 0)
    {
      this.disabled = false;
    }
  } */

  omit_special_char(e) {
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  onBack() {
    this.navCtrl.navigateBack('/tabs/my-wallet');
  }

  async GetBankInfo()
  {
    try
    {
        this.BankDataResponse = await this.configurationService.getConfiguration();
        this.BankDataResponse = this.BankDataResponse['account'];
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

  addDeposit()
  {
    this.isLoading = true;
    var depositAmount = this.amountForm.controls['depositAmount'].value;
    var utrNumber = this.amountForm.controls['utrNumber'].value;
    this.transactionService.depositWithdrawalAmount(depositAmount,"deposit",utrNumber)
      .then((res) => {
      if (res.status =="SUCCESS")
      {
        this.isLoading = false;
        this.amountForm.reset();
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


}
