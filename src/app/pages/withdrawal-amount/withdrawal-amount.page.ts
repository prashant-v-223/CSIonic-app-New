import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BankDetailsService } from '../bank-details/bank-details.service';

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
  maxWithdrawalAmounts:number = 2000;
  constructor(private navCtrl: NavController,private userService: UserService,private bankService: BankDetailsService,public toastController: ToastController,private alertCtrl: AlertController,private configurationService:ConfigurationService,private transactionService:TransactionsService) { }
   ngOnInit() {
    const user = this.userService.getUserFromStorage();
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
    withdrawalAmount: new FormControl('',[Validators.required,Validators.pattern(/^-?([0-9]\d*)?$/),Validators.min(1),Validators.max(this.maxWithdrawalAmounts)]),
  });

  onBack() {
    this.navCtrl.navigateBack('/tabs/profile');
  }

  withdrawalAmount()
  {
    this.isLoading = true;
    this.transactionService.depositWithdrawalAmount(this.amountForm.controls['withdrawalAmount'].value,"withdrawal")
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
